import { createContext, useContext, useMemo } from "react";
import { BooksDataProvider } from "@/services/BookService/Interface";

const BooksServiceContext = createContext<BooksDataProvider | null>(null);

export function useBooksService() {
  const ctx = useContext(BooksServiceContext);
  if (!ctx) throw new Error("useBooksService must be used inside BooksService");
  return ctx;
}

export const BooksServiceProvider = ({
  provider,
  children,
}: {
  provider: BooksDataProvider;
  children: React.ReactNode;
}) => {
  const service = useMemo<BooksDataProvider>(() => provider, []);

  return (
    <BooksServiceContext.Provider value={service}>
      {children}
    </BooksServiceContext.Provider>
  );
};
