"use client";

import { useMemo, useState } from "react";
import productsData from "@/data/products.json";

type Product = {
  Code: string | null;
  "code of supplier": string | null;
  description?: string | null;
  "in stock qte": number | string | null;
  area: string | null;
};

const products = productsData as Product[];

const safeText = (value: unknown) => String(value ?? "");

const areaIds = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "X",
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    null
  );

  const filteblueProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return [];

    return products
      .filter((product) => {
        return (
          safeText(product.Code).toLowerCase().includes(query) ||
          safeText(product["code of supplier"])
            .toLowerCase()
            .includes(query) ||
          safeText(product.description).toLowerCase().includes(query)
        );
      })
      .slice(0, 100);
  }, [search]);

  const getAreaProducts = (area: string) =>
    products.filter(
      (product) =>
        safeText(product.area).trim().toUpperCase() === area
    );

  const getAreaCount = (area: string) => getAreaProducts(area).length;

  const chooseArea = (area: string) => {
    setSelectedArea(area);
    setSelectedProduct(null);
  };

  const chooseProduct = (product: Product) => {
    setSelectedProduct(product);
    setSelectedArea(
      safeText(product.area).trim().toUpperCase() || "X"
    );
  };

  const areaButton = (area: string, extraClass = "") => {
    const active = selectedArea === area;
    const count = getAreaCount(area);

    return (
      <button
        key={area}
        onClick={() => chooseArea(area)}
        className={`flex min-h-24 flex-col items-center justify-center rounded-lg border-2 p-3 text-center transition ${
          active
            ? "border-blue-600 bg-blue-600 text-white shadow-lg"
            : "border-slate-300 bg-white text-slate-800 hover:border-blue-400 hover:bg-blue-50"
        } ${extraClass}`}
      >
        <span className="text-2xl font-extrabold">{area}</span>
        <span
          className={`mt-1 text-xs ${
            active ? "text-blue-100" : "text-slate-500"
          }`}
        >
          {count} products
        </span>
      </button>
    );
  };

  return (
    <main className="min-h-screen bg-slate-100 p-4 text-slate-900 md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Warehouse Finder
          </h1>
          <p className="mt-2 text-slate-500">
            Search for a product to find its warehouse area.
          </p>
        </header>

        {/* Summary */}
        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total products</p>
            <p className="mt-1 text-3xl font-bold">
              {products.length.toLocaleString()}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Warehouse areas</p>
            <p className="mt-1 text-3xl font-bold">{areaIds.length}</p>
          </div>

          <div className="col-span-2 rounded-xl bg-white p-5 shadow-sm md:col-span-1">
            <p className="text-sm text-slate-500">Selected area</p>
            <p className="mt-1 text-3xl font-bold text-blue-600">
              {selectedArea ?? "—"}
            </p>
          </div>
        </div>

        {/* Search */}
        <section className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
          <label
            htmlFor="product-search"
            className="mb-2 block font-semibold"
          >
            Search products
          </label>

          <input
            id="product-search"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Enter product code, supplier code or description..."
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          {search.trim() && (
            <div className="mt-4">
              <p className="mb-3 text-sm text-slate-500">
                {filteblueProducts.length} matching products shown
                {filteblueProducts.length === 100 ? " (maximum 100)" : ""}
              </p>

              {filteblueProducts.length > 0 ? (
                <div className="max-h-80 overflow-y-auto rounded-lg border border-slate-200">
                  {filteblueProducts.map((product, index) => (
                    <button
                      key={`${safeText(product.Code)}-${index}`}
                      onClick={() => chooseProduct(product)}
                      className="flex w-full items-center justify-between gap-4 border-b border-slate-100 p-4 text-left last:border-b-0 hover:bg-blue-50"
                    >
                      <div className="min-w-0">
                        <p className="font-semibold">
                          {safeText(product.Code) || "No product code"}
                        </p>
                        <p className="mt-1 truncate text-sm text-slate-500">
                          {safeText(product.description) ||
                            "No description"}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          Supplier:{" "}
                          {safeText(product["code of supplier"]) || "—"}
                        </p>
                      </div>

                      <span className="shrink-0 rounded-lg bg-slate-100 px-3 py-2 text-sm font-bold">
                        Area{" "}
                        {safeText(product.area).trim().toUpperCase() ||
                          "X"}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">
                  No products found.
                </p>
              )}
            </div>
          )}
        </section>

        {/* Main content */}
        <div className="grid items-start gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/* Warehouse layout */}
<section className="rounded-2xl bg-white p-5 shadow-sm">
  <div className="mb-5">
    <h2 className="text-xl font-bold">Warehouse layout</h2>
    <p className="mt-1 text-sm text-slate-500">
      Select an area to view its products.
    </p>
  </div>

  <div className="overflow-x-auto">
    <div className="min-w-[680px] rounded-2xl border-2 border-slate-300 bg-slate-200 p-3 shadow-inner">
      {/* Top row */}
      <div className="grid grid-cols-5 gap-2">
        {["B", "C", "D", "H", "J"].map((area) =>
          areaButton(area, "min-h-14 rounded-md shadow-sm")
        )}
      </div>

      {/* Main warehouse floor */}
      <div className="my-3 grid grid-cols-[90px_1fr_90px] gap-3">
        {/* Left side */}
        <div className="flex flex-col justify-around gap-3 rounded-lg bg-slate-300 p-2">
          {["K", "F"].map((area) =>
            areaButton(area, "min-h-20 rounded-md shadow-sm")
          )}
        </div>

        {/* Central shelves and aisles */}
        <div className="rounded-lg border border-slate-300 bg-slate-100 p-4">
          <div className="grid grid-cols-4 gap-4">
            {["I", "G", "E", "A"].map((area) =>
              areaButton(
                area,
                "min-h-[320px] rounded-md shadow-md"
              )
            )}
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col justify-around gap-3 rounded-lg bg-slate-300 p-2">
          {["X"].map((area) =>
            areaButton(area, "min-h-20 rounded-md shadow-sm")
          )}
        </div>
      </div>

      {/* Bottom row */}
      
    </div>
  </div>

  <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">
    <div className="flex items-center gap-2">
      <span className="h-3 w-3 rounded-sm border border-slate-300 bg-white" />
      Available area
    </div>
    <div className="flex items-center gap-2">
      <span className="h-3 w-3 rounded-sm bg-blue-600" />
      Selected area
    </div>
  </div>
</section>

          {/* Area details */}
          <section className="rounded-2xl bg-white p-5 shadow-sm">
            {selectedProduct ? (
              <>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="mb-4 text-sm font-semibold text-blue-600 hover:underline"
                >
                  ← Back to area
                </button>

                <h2 className="text-xl font-bold">Product details</h2>

                <div className="mt-4 rounded-xl border border-slate-200 p-4">
                  <p className="text-sm text-slate-500">Product code</p>
                  <p className="mt-1 break-words text-lg font-bold">
                    {safeText(selectedProduct.Code) || "—"}
                  </p>

                  <div className="mt-4">
                    <p className="text-sm text-slate-500">Supplier code</p>
                    <p className="mt-1 font-semibold">
                      {safeText(selectedProduct["code of supplier"]) || "—"}
                    </p>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-slate-500">Description</p>
                    <p className="mt-1">
                      {safeText(selectedProduct.description) || "—"}
                    </p>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-slate-500">
                      Available quantity
                    </p>
                    <p className="mt-1 text-xl font-bold">
                      {safeText(selectedProduct["in stock qte"]) || "0"}
                    </p>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-slate-500">Warehouse area</p>
                    <p className="mt-1 text-2xl font-extrabold text-blue-600">
                      {safeText(selectedProduct.area).trim().toUpperCase() ||
                        "X"}
                    </p>
                  </div>
                </div>
              </>
            ) : selectedArea ? (
              <>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold">
                      Area {selectedArea}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Products assigned to this area
                    </p>
                  </div>

                  <span className="rounded-xl bg-blue-50 px-4 py-3 text-2xl font-extrabold text-blue-600">
                    {getAreaCount(selectedArea)}
                  </span>
                </div>

                <div className="mt-5 max-h-[520px] space-y-2 overflow-y-auto">
                  {getAreaProducts(selectedArea).length > 0 ? (
                    getAreaProducts(selectedArea).map((product, index) => (
                      <button
                        key={`${safeText(product.Code)}-${index}`}
                        onClick={() => chooseProduct(product)}
                        className="w-full rounded-lg border border-slate-200 p-3 text-left transition hover:border-blue-300 hover:bg-blue-50"
                      >
                        <p className="font-semibold">
                          {safeText(product.Code) || "No product code"}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          {safeText(product.description) || "No description"}
                        </p>
                        <p className="mt-2 text-xs text-slate-400">
                          Supplier:{" "}
                          {safeText(product["code of supplier"]) || "—"}
                          {" · "}
                          Quantity:{" "}
                          {safeText(product["in stock qte"]) || "0"}
                        </p>
                      </button>
                    ))
                  ) : (
                    <p className="rounded-lg bg-slate-50 p-5 text-center text-sm text-slate-500">
                      No products assigned to this area yet.
                    </p>
                  )}
                </div>
              </>
            ) : (
              <div className="flex min-h-64 flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-3xl">
                  <span aria-hidden="true">⌕</span>
                </div>
                <h2 className="text-xl font-bold">Find a product</h2>
                <p className="mt-2 max-w-xs text-sm text-slate-500">
                  Search by product code or supplier code, or select an area
                  on the warehouse map.
                </p>
              </div>
            )}
          </section>
        </div>

        <footer className="mt-6 text-center text-xs text-slate-400">
          Warehouse Finder · Product locations are based on your JSON data
        </footer>
      </div>
    </main>
  );
}