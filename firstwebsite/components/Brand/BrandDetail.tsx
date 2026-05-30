'use client';
import { useSearchParams } from "next/navigation";

export default function BrandDetailComponent() {
  const query = useSearchParams();

  return (<>
    query: {query.get('page')}
  </>)
}