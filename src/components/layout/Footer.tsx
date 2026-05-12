export function Footer() {
  return (
    <footer className="border-t bg-card text-card-foreground">
      <div className="container py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col gap-1 text-center md:text-start">
          <span className="font-bold text-xl">Halfa+</span>
          <span className="text-muted-foreground text-sm">منصتك المتميزة لحجز تذاكر الفعاليات</span>
        </div>
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Halfa+. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
