const serverPagination = (
  dataLength: number,
  page: number,
  pageSize: number
) => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const totalPages = Math.ceil(dataLength / pageSize);

  return { totalPages, start, end };
};

export default serverPagination;
