import React from 'react';
import './pagination.css';

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  // Determine which page numbers to display
  if (totalPages <= 10) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    if (currentPage <= 5) {
      pageNumbers.push(1, 2, 3, 4, 5, '...', totalPages);
    } else if (currentPage >= totalPages - 4) {
      pageNumbers.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
  }
  let nextpage = currentPage + 1;
  if (nextpage > totalPages){
    nextpage = currentPage;
  }
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number, index) =>
          typeof number === 'number' ? (
            <li key={index} className={`page-item ${currentPage === number ? 'active' : ''}`}>
              <a onClick={() => paginate(number)} href="#!" className="page-link">
                {number}
              </a>
            </li>
          ) : (
            <li key={index} className="page-item">
              <span className="page-link">{number}</span>
            </li>
          )
        )}
        <li key={nextpage} className="page-item">
              <a onClick={() => paginate(nextpage)} href="#!" className="page-link">
                Next
              </a>
            </li>
      </ul>
    </nav>
  );
};

export default Pagination;
