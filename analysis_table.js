var changeScroll_top = 0;
var changeScroll_bottom = 0;
var navbar = document.querySelector(".navbar"); // Mengubah pemilihan elemen menjadi class navbar
var navLinks = document.querySelectorAll(".navbar-nav a"); // Menambahkan variabel untuk menyimpan semua tautan navbar
var footer = document.querySelector(".footer");
var footerText = document.querySelectorAll(".footer-text");

window.addEventListener("scroll", function(){
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  var scrollBottom = window.pageYOffset || document.documentElement.scrollBottom;
  if(scrollTop > changeScroll_top){
    navbar.style.top = "-80px"; // Mengubah style top menjadi -80px untuk menyembunyikan navbar
    navLinks.forEach(function(link) {
      link.style.opacity = "0"; // Menyembunyikan tautan navbar dengan mengubah opacity menjadi 0
      link.style.transition = "0.5s";
    });

    if (scrollBottom > changeScroll_bottom){
      footer.style.bottom = "0"; // Mengubah style top menjadi -80px untuk menyembunyikan navbar
    footerText.forEach(function(link) {
      link.style.opacity = "1"; // Menyembunyikan tautan navbar dengan mengubah opacity menjadi 0
      link.style.transition = "0.5s";
    });
    }
  } else {
    navbar.style.top = "0"; // Mengembalikan style top menjadi 0 untuk menampilkan navbar kembali
    footer.style.bottom = "-80px"
    navLinks.forEach(function(link) {
      link.style.opacity = "1"; // Menampilkan kembali tautan navbar dengan mengubah opacity menjadi 1
      link.style.transition = "0.5s";
    });

    footerText.forEach(function(link) {
      link.style.opacity = "0"; // Menyembunyikan tautan navbar dengan mengubah opacity menjadi 0
      link.style.transition = "0.5s";
    });
  }
  changeScroll_top = scrollTop;
  changeScroll_bottom = scrollBottom;
});



//Toggle class active

document.querySelector("#menu-btn").onclick = () => {
  navbar.classList.toggle("active");
  searchForm.classList.remove("active");
};

let searchForm = document.querySelector(".search-form");

document.querySelector("#search-btn").onclick = () => {
  searchForm.classList.toggle("active");
  navbar.classList.remove("active");
};


window.onscroll = () => {
  navbar.classList.remove("active");
  searchForm.classList.remove("active");
};

document.addEventListener('DOMContentLoaded', init);

let coffeeShopData = "/coffeeShopSalesData.json";
let currentData = [];
const pageSize = 10;
let currentPage = 1;

function init() {
    loadData(coffeeShopData, function (data) {
        coffeeShopData = data;
        currentData = coffeeShopData; // Set initial data to the complete dataset
        processData('Coffee Shop Sales', currentData.slice(0, pageSize));
        updatePagination(currentData);
    });

    document.getElementById('filter-button').addEventListener('click', handleFilter);
    document.getElementById('prev-button').addEventListener('click', () => changePage(-1));
    document.getElementById('next-button').addEventListener('click', () => changePage(1));
    document.getElementById('reset-button').addEventListener('click', resetData);
}

function loadData(url, callback) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => callback(data))
        .catch(error => console.error('Error fetching data: ', error));
}

function processData(title, data) {
    const headers = Object.keys(data[0]);
    const tableContainer = document.getElementById('data-table');
    tableContainer.innerHTML = ''; // Clear previous table

    // Create a new table container
    const newTableContainer = document.createElement('div');
    newTableContainer.classList.add('table-container');

    // Add title for the table
    const tableTitle = document.createElement('h2');
    tableTitle.textContent = title;
    newTableContainer.appendChild(tableTitle);

    const table = document.createElement('table');
    table.classList.add('styled-table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Get column headers
    const headerRow = document.createElement('tr');
    headers.forEach(col => {
        const th = document.createElement('th');
        th.textContent = col;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // Initial table population
    populateTable(tbody, data, headers);

    table.appendChild(thead);
    table.appendChild(tbody);
    newTableContainer.appendChild(table);
    tableContainer.appendChild(newTableContainer);
}

function populateTable(tbody, data, headers) {
    tbody.innerHTML = ''; // Clear tbody content

    // Display each row of data in the table
    data.forEach(row => {
        const tr = document.createElement('tr');
        headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = row[header];
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
}

function handleFilter() {
    const filterType = document.getElementById('filter-type').value;
    const filterValue = document.getElementById('filter-value').value.toLowerCase();

    if (filterType && filterValue) {
        console.log('Filtering data:', filterType, filterValue);

        const filteredData = coffeeShopData.filter(item => {
            const filterText = filterValue.toLowerCase();
            let isFiltered = false;

            if (filterType === 'store_location') {
                isFiltered = item.store_location.toLowerCase().includes(filterText);
            } else if (filterType === 'product_category') {
                isFiltered = item.product_category.toLowerCase().includes(filterText);
            } else if (filterType === 'product_type') {
                isFiltered = item.product_type.toLowerCase().includes(filterText);
            }

            return isFiltered;
        });

        console.log('Filtered data:', filteredData);

        if (filteredData.length > 0) {
            showModal('Data ditemukan!', 'green');
        } else {
            showModal('Data tidak ditemukan.', 'red');
        }

        currentData = filteredData;
        currentPage = 1;
        processData('Filtered Coffee Shop Sales', currentData.slice(0, pageSize));
        updatePagination(currentData);
        document.getElementById('reset-button').style.display = 'block';
    } else {
        showModal('Action input belum terisi', 'yellow');
    }
}

function updatePagination(data) {
    const totalPages = Math.ceil(data.length / pageSize);
    document.getElementById('prev-button').disabled = currentPage === 1;
    document.getElementById('next-button').disabled = currentPage === totalPages;
    document.getElementById('page-info').textContent = `Page ${currentPage} of ${totalPages}`;
}

function changePage(direction) {
    currentPage += direction;
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const dataToShow = currentData.slice(start, end);
    populateTable(document.querySelector('tbody'), dataToShow, Object.keys(currentData[0]));
    updatePagination(currentData);
}

function showModal(message, color) {
    const modalTitle = "Filter Result";
    const modalContent = message;

    // Set modal content and color
    document.getElementById('modal-title').textContent = modalTitle;
    document.getElementById('modal-content').textContent = modalContent;
    document.querySelector('.modal-content').style.backgroundColor = color;

    // Display modal
    var modal = document.getElementById("filterModal");
    modal.style.display = "block";
}

function resetData() {
    const countdownTime = 5; // Countdown time in seconds
    let timeLeft = countdownTime;

    showModal(`Data berhasil direset. Mengambil ulang data dalam ${timeLeft} detik...`, 'white');

    const countdownInterval = setInterval(() => {
        timeLeft -= 1;
        if (timeLeft > 0) {
            document.getElementById('modal-content').textContent = `Data berhasil direset. Mengambil ulang data dalam ${timeLeft} detik...`;
        } else {
            clearInterval(countdownInterval);
            // Reload the data after the countdown
            currentData = coffeeShopData;
            currentPage = 1;
            document.getElementById('reset-button').style.display = 'none';
            processData('Coffee Shop Sales', currentData.slice(0, pageSize));
            updatePagination(currentData);
            showModal('Data berhasil direset.', 'white');
        }
    }, 1000);
}

// Event listener untuk menutup modal saat tombol close diklik
var closeBtn = document.querySelector("#filterModal .close");
closeBtn.onclick = function () {
    var modal = document.getElementById("filterModal");
    modal.style.display = "none";
}


