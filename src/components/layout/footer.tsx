export const Footer = () => {
  return (
    <footer className="bg-gray-400 text-white">
      <div className="max-w-7xl mx-auto py-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Tienda UCN. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
};
