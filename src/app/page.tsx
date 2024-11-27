"use client";
import React from "react";
import Header from "../components/layout/Header";
import ProductGrid from "../components/product/ProductGrid";
import CategoryBar from "../components/layout/CategoryBar";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow">
        <CategoryBar />
        <div className="py-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Fresh Groceries
          </h1>
          <ProductGrid />
        </div>
      </main>
      <Footer />
    </div>
  );
}
