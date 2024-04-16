function Pagination({ totalPages, currentPage, setCurrentPage }) {
    const pageNumbers = [];
    for (let i = 0; i < totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <ul className="pagination" style={{display: 'flex', justifyContent: 'center'}}>
            {pageNumbers.map(number => (
                <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                    <a style={{cursor: 'pointer', margin: '5px'}} onClick={() => setCurrentPage(number)} className="page-link">
                        {number + 1}
                    </a>
                </li>
            ))}
        </ul>
    );
}

export default Pagination;