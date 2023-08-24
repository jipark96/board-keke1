import React from "react";
import { PageNumber, PaginationWrap } from "./PaginationStyles";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  return (
    <>
      <PaginationWrap>
        <PageNumber
          onClick={() => onPageChange(currentPage - 1)}
          active={currentPage === 1}
        >
          {"<"}
        </PageNumber>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <PageNumber
              key={page}
              active={page === currentPage} // 현재 페이지와 일치하면 활성화된 스타일 적용
              onClick={() => onPageChange(page)}
            >
              {page}
            </PageNumber>
          )
        )}
        <PageNumber
          onClick={() => onPageChange(currentPage + 1)}
          active={currentPage === totalPages}
        >
          {">"}
        </PageNumber>
      </PaginationWrap>
    </>
  );
};

export default Pagination;
