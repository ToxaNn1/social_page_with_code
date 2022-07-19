import React from "react";
import "./Pagination.css";

const Pagination = ({ postPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <ul className="pagination">
                {pageNumbers.map((number) => (
                    <li className="paginationLi" key={number} onClick={() => paginate(number)}>
                        <span className="pageLink" >
                            {number}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Pagination;
