"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagination = ({
  currentPage = 1,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const handleChangePage = (page: number = 1) => {
    if (page > totalPages || page < 1) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(pathname + "?" + params);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex gap-4">
      <button onClick={() => handleChangePage(currentPage - 1)}>{"<"}</button>
      <ul className="flex gap-4">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handleChangePage(page)}
            className="border p-4"
          >
            {page}
          </button>
        ))}
      </ul>
      <button onClick={() => handleChangePage(currentPage + 1)}>{">"}</button>
    </div>
  );
};

export default Pagination;
