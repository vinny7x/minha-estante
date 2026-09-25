"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { truncateText } from "@/utils/truncateText";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { saveUserBook } from "@/actions/user/saveUserBook";
import { toast } from "react-toastify";
import { Badge } from "@/components/ui/badge";
import { BookIcon, LoaderIcon, PlusCircleIcon, SaveIcon, SearchIcon, XCircleIcon } from "lucide-react";


type Book = {
  id: string;
  title: string;
  authors: string;
  thumbnail?: string;
  description?: string;
  pages: string;
};

export default function AddPage() {
  const [noResult, setNoResult] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Book[]>([]);

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [status, setStatus] = useState("reading");
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState("");

  const [isSaving, startSaveTransition] = useTransition();
  const [isSearching, startSearchTransition] = useTransition();

  async function handleSearch() {
    if (!query.trim()) return;
    startSearchTransition(async () => {
      const res = await fetch(
        `/api/books/search?q=${encodeURIComponent(query)}`
      );

      const data: Book[] = await res.json();
      if (!data.length) {
        setNoResult(true);
        setQuery('');
      } else {
        setNoResult(false);
        setResults(data);
      }
    });
  }

  function openDetails(book: Book) {
    setSelectedBook(book);
    setIsDetailsOpen(true);
  }

  function openAddModal() {
    setIsDetailsOpen(false);
    setIsAddModalOpen(true);
  }

  function handleCloseAddModal() {
    setIsAddModalOpen(false);
    setSelectedBook(null);
    setStatus("reading");
    setRating(0);
    setReview("");
  }
  function handleCloseDetailsModal() {
    setIsDetailsOpen(false);
    setSelectedBook(null);
    setStatus("reading");
    setRating(0);
    setReview("");
  }

  async function handleSubmit() {
    if (!selectedBook) return;
    startSaveTransition(async () => {
      try {
        await saveUserBook({
          googleId: selectedBook.id,
          title: selectedBook.title,
          authors: selectedBook.authors,
          thumbnail: selectedBook.thumbnail,
          description: selectedBook.description,
          pages: selectedBook.pages,
          status,
          rating,
          review,
        });
        toast.success('Livro adicionado à sua estante');
        handleCloseAddModal();
      } catch {
        toast.warning('Esse livro já está em sua estante');
        handleCloseAddModal();
      }
    });

  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Adicionar Livro</h1>

      {/* Busca */}
      <div className="flex gap-2 mb-6">
        <Input
          placeholder="Buscar livro..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button disabled={isSearching} className="flex items-center gap-2" onClick={handleSearch}>

          {isSearching ? (
            <>
              <LoaderIcon className="animate-spin" />
              Buscando...
            </>
          ) : (
            <>
              <SearchIcon /> Buscar
            </>
          )}</Button>
      </div>

      {/* Resultados */}
      {noResult && (
        <p>Nenhum livro correspondente com a busca.</p>
      )}

      {results.length > 0 && (
        <div className="space-y-3">
          {results.map((book) => (
            <Card
              key={book.id}
              onClick={() => openDetails(book)}
              className="cursor-pointer transition hover:bg-muted"
            >
              <CardContent className="flex gap-4 p-4">
                {book.thumbnail && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={book.thumbnail}
                    alt={book.title}
                    className="w-16 h-24 object-cover rounded"
                  />
                )}

                <div>
                  <p className="font-semibold">{book.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {book.authors}
                  </p>
                  <p>
                    {truncateText(book.description, 100)}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Modal 1 - Detalhes */}
      <AlertDialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <AlertDialogContent>
          {selectedBook && (
            <>
              <AlertDialogHeader className="text-center justify-center">
                <AlertDialogTitle>{selectedBook.title}</AlertDialogTitle>
                <AlertDialogDescription>
                  {selectedBook.authors}
                </AlertDialogDescription>
              </AlertDialogHeader>

              {selectedBook.thumbnail && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={selectedBook.thumbnail}
                  alt={selectedBook.title}
                  className="w-32 mx-auto rounded"
                />
              )}
              <Badge>
                <BookIcon />
                {selectedBook.pages} Páginas
              </Badge>
              <p></p>
              <ScrollArea className="max-h-72 p-2 bg-muted rounded-sm">
                <p className="leading-relaxed whitespace-pre-wrap warp-break-words">
                  {selectedBook.description || "Sem descrição disponível."}
                </p>
              </ScrollArea>
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  className="flex items-center gap-2"
                  variant="outline"
                  onClick={handleCloseDetailsModal}
                >
                  <XCircleIcon /> Fechar
                </Button>
                <Button className="flex items-center gap-2" onClick={openAddModal}>
                  <PlusCircleIcon /> Adicionar à biblioteca
                </Button>
              </div>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>
      {/* Modal 2 - Configurar livro */}
      <AlertDialog open={isAddModalOpen} onOpenChange={handleCloseAddModal}>
        <AlertDialogContent>
          {selectedBook && (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Adicionar {selectedBook.title}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Configure como o livro ficará na sua biblioteca.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="space-y-4 mt-4">
                <Select
                  value={status}
                  onValueChange={(value) => setStatus(value)}
                >
                  <SelectTrigger >
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reading">Lendo</SelectItem>
                    <SelectItem value="read">Lido</SelectItem>
                    <SelectItem value="wantToRead">Quero ler</SelectItem>
                  </SelectContent>
                </Select>
                {status === 'read' && (
                  <><Input
                    type="number"
                    min={0}
                    max={5}
                    step={0.5}
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    placeholder="Nota"
                  />
                    <ScrollArea className="max-h-72">
                      <Textarea
                        maxLength={2000}
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        className="leading-relaxed whitespace-pre-wrap warp-break-words max-h-72 w-72"
                        placeholder="Review"
                      />
                    </ScrollArea>
                  </>
                )}


                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    className="flex items-center gap-2"
                    variant="outline"
                    onClick={handleCloseAddModal}
                  >
                    <XCircleIcon /> Cancelar
                  </Button>

                  <Button disabled={isSaving} className="flex items-center gap-2" onClick={handleSubmit}>
                    {isSaving ? (
                      <>
                        <LoaderIcon className="animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      <>
                        <SaveIcon />
                        Salvar
                      </>
                    )}


                  </Button>
                </div>
              </div>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}