import React from "react";

const SearchBox = (props) => {
    return (
        <div className="search-box">
            <div className="col col-sm-4">
                <input
                    className="form-control"
                    value={props.value}
                    onChange={(event) => props.setSearchVal(event.target.value)}
                    placeholder="Type to search..."

                ></input>
            </div>
        </div>
    );
};

export default SearchBox;