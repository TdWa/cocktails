import React from "react";
import { useParams } from "react-router-dom";

export default function CategoryPage() {
  const param = useParams().coctail;

  return <div>Specific category: {param}</div>;
}
