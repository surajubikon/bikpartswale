import React, { useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net-dt/css/jquery.dataTables.css"; // Import DataTables CSS

const DataTable = () => {
  const tableRef = useRef();

  useEffect(() => {
    // Initialize the DataTable
    const table = $(tableRef.current).DataTable({
      data: [
        ["John Doe", "Developer", "San Francisco", "$120,000"],
        ["Jane Smith", "Designer", "New York", "$100,000"],
      ],
      columns: [
        { title: "Name" },
        { title: "Position" },
        { title: "Location" },
        { title: "Salary" },
      ],
    });

    return () => {
      // Destroy the DataTable on unmount to prevent memory leaks
      table.destroy(true);
    };
  }, []);

  return (
    <div>
      <table ref={tableRef} className="display" style={{ width: "100%" }}></table>
    </div>
  );
};

export default DataTable;
