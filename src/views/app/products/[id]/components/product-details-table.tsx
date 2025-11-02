import { ProductDetailForCustomerResponse } from "@/models/responses";

interface ProductDetailsTableProps {
  product: ProductDetailForCustomerResponse;
}

export const ProductDetailsTable = ({ product }: ProductDetailsTableProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        Detalles del Producto
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left p-3 border-b border-gray-200 font-semibold text-gray-700 w-1/4">
                Característica
              </th>
              <th className="text-left p-3 border-b border-gray-200 font-semibold text-gray-700">
                Detalle
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50">
              <td className="p-3 border-b border-gray-100 font-medium text-gray-600">
                Descripción
              </td>
              <td className="p-3 border-b border-gray-100 text-gray-800">
                {product.description || "No disponible"}
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="p-3 border-b border-gray-100 font-medium text-gray-600">
                Categoría
              </td>
              <td className="p-3 border-b border-gray-100 text-gray-800">
                {product.categoryName || "No disponible"}
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="p-3 font-medium text-gray-600">Estado</td>
              <td className="p-3 text-gray-800">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    product.statusName === "New"
                      ? "bg-green-100 text-green-800"
                      : product.statusName === "Used"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {product.statusName === "New"
                    ? "Nuevo"
                    : product.statusName === "Used"
                      ? "Usado"
                      : ""}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
