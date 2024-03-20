$(document).ready(function() {
    var pageSize = 5;
    var currentPage = 1;
    var totalCustomers = 0;
    var totalPages = 0;

    $("#fetchCustomersBtn").click(function() {
        fetchCustomers();
    });

    function fetchCustomers() {
        $.ajax({
            url: "https://firestore.googleapis.com/v1/projects/onlineewebsite/databases/(default)/documents/Customer",
            type: "GET",
            success: function(response) {
                console.log("Response:", response); // Log the response object
                if (response && response.documents && Array.isArray(response.documents)) {
                    var customers = response.documents;
                    totalCustomers = customers.length;
                    totalPages = Math.ceil(totalCustomers / pageSize);
                    displayCustomers(customers);
                    displayPagination();
                } else {
                    console.error("Invalid or unexpected response format.");
                }
            },
            error: function(xhr, status, error) {
                console.error("Error fetching customers:", error);
            }
        });
    }

    function displayCustomers(customers) {
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize, totalCustomers);
        var customerListHTML = "<table><tr><th>Document ID</th><th>Name</th><th>Email</th><th>Credit Limit</th><th>Mobile</th></tr>";
        for (var i = startIndex; i < endIndex; i++) {
            var customer = customers[i];
            var documentId = customer.name.split('/').pop(); // Extract document ID from document name
            var fields = customer.fields || {};
            // Retrieve field values directly from the fields object
            var name = fields.fullName ? fields.fullName.stringValue : 'N/A';
            var email = fields.email ? fields.email.stringValue : 'N/A';
            var creditLimit = fields.credit ? fields.credit.integerValue : 'N/A';
            var mobile = fields.contact ? fields.contact.stringValue : 'N/A';
            // Append the values to the table row
            customerListHTML += "<tr><td>" + documentId + "</td><td>" + name + "</td><td>" + email + "</td><td>" + creditLimit + "</td><td>" + mobile + "</td></tr>";
        }
        customerListHTML += "</table>";
        $("#customerList").html(customerListHTML);
    }

    function displayPagination() {
        var paginationHTML = "<div class='pagination'>";
        for (var i = 1; i <= totalPages; i++) {
            var activeClass = i === currentPage ? "active" : "";
            paginationHTML += "<a href='#' class='" + activeClass + "' onclick='changePage(" + i + ")'>" + i + "</a>";
        }
        paginationHTML += "</div>";
        $("#paginationContainer").html(paginationHTML);
    }

    window.changePage = function(page) {
        if (page >= 1 && page <= totalPages) {
            currentPage = page;
            fetchCustomers();
        }
    };
});
