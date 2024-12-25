// Daftar menu
const menu = {
    "1": { nama: "Ayam Geprek", harga: 12000 },
    "2": { nama: "Nasi Goreng", harga: 10000 },
    "3": { nama: "Mie Goreng", harga: 10000 },
    "4": { nama: "Es Teh", harga: 4000 },
    "5": { nama: "Es Jeruk", harga: 4000 },
};

let orders = [];
let totalPrice = 0;

// Tampilkan menu ke HTML
const menuList = document.getElementById("menu-list");
for (let kode in menu) {
    const item = menu[kode];
    const li = document.createElement("li");
    li.textContent = `${kode}. ${item.nama} - Rp ${item.harga}`;
    menuList.appendChild(li);
}

// Tambahkan pesanan
function addOrder() {
    const menuCode = document.getElementById("menu-code").value;
    const quantity = parseInt(document.getElementById("quantity").value);

    if (!menu[menuCode]) {
        alert("Kode menu tidak valid!");
        return;
    }

    const order = menu[menuCode];
    const subtotal = order.harga * quantity;

    orders.push({ nama: order.nama, qty: quantity, harga: order.harga, subtotal });
    totalPrice += subtotal;

    updateOrderList();
    updateTotalPrice();
    document.getElementById("menu-code").value = "";
    document.getElementById("quantity").value = 1;
}

// Perbarui daftar pesanan di HTML
function updateOrderList() {
    const orderList = document.getElementById("order-list");
    orderList.innerHTML = "";

    orders.forEach((order) => {
        const li = document.createElement("li");
        li.textContent = `${order.nama} x${order.qty} = Rp ${order.subtotal}`;
        orderList.appendChild(li);
    });
}

// Perbarui total harga di HTML
function updateTotalPrice() {
    document.getElementById("total-price").textContent = totalPrice;
}

// Proses pembayaran tunai
function pay() {
    const cash = parseInt(document.getElementById("cash").value);

    if (cash < totalPrice) {
        alert("Uang tidak cukup!");
        return;
    }

    const change = cash - totalPrice;

    // Tampilkan pesan pembayaran
    const message = `Pembayaran berhasil! Kembalian Anda: Rp ${change}`;
    document.getElementById("change-message").textContent = message;

    // Buat struk untuk dicetak
    createPrintStruk(cash, change);

    // Tampilkan tombol cetak
    document.getElementById("print-btn").style.display = "block";

    // Reset data
    orders = [];
    totalPrice = 0;
    updateOrderList();
    updateTotalPrice();
    document.getElementById("cash").value = "";
}
// Fungsi untuk menampilkan pembayaran QRIS
function showQRIS() {
    document.getElementById("qris-area").style.display = "block";
    document.getElementById("qris-total").textContent = totalPrice;
}

// Fungsi untuk menyembunyikan area QRIS
function hideQRIS() {
    document.getElementById("qris-area").style.display = "none";
}

// Fungsi untuk melanjutkan ke proses pencetakan setelah pembayaran QRIS
function lanjutKePrint() {
    // Sembunyikan QRIS
    document.getElementById("qris-area").style.display = "none";

    // Buat struk untuk dicetak (termasuk QRIS)
    createPrintStruk();

    // Tampilkan tombol cetak
    document.getElementById("print-btn").style.display = "block";
}

// Buat struk untuk dicetak (termasuk QRIS)
function createPrintStruk() {
    const printArea = document.getElementById("print-area");
    printArea.innerHTML = `
        <h2>Warung Mannn</h2>
        <p><strong>Struk Pembelian</strong></p>
        <ul>
            ${orders.map(order => `<li>${order.nama} x${order.qty} = Rp ${order.subtotal}</li>`).join("")}
        </ul>
        <p><strong>Total Harga:</strong> Rp ${totalPrice}</p>
        <p><strong>Uang Tunai:</strong> Rp ${document.getElementById("cash").value}</p>
        <p><strong>Kembalian:</strong> Rp ${totalPrice - document.getElementById("cash").value}</p>
        <p>Terima kasih telah berbelanja!</p>
        <hr>
        <p><strong>Scan QR Code untuk Pembayaran:</strong></p>
        <img src="qris.png" alt="QRIS Code" style="width: 150px;">
    `;

    // Tampilkan area struk
    printArea.style.display = "block";
}

// Cetak struk
function printStruk() {
    window.print();
}



// Buat struk untuk dicetak
function createPrintStruk(cash, change) {
    const printArea = document.getElementById("print-area");
    printArea.innerHTML = `
        <img src="logo.png" alt="Logo Warung Agus">
        <h2>Warung Mannn</h2>
        <p1>Padang Cermin 081213141516</p1>
        <p><strong>Struk Pembelian</strong></p>
        <ul>
            ${orders.map(order => `<li>${order.nama} x${order.qty} = Rp ${order.subtotal}</li>`).join("")}
        </ul>
        <p><strong>Total Harga:</strong> Rp ${totalPrice}</p>
        <p><strong>Uang Tunai:</strong> Rp ${cash}</p>
        <p><strong>Kembalian:</strong> Rp ${change}</p>
        <p1>Terima kasih telah mampir!</p1>
    `;

    // Tampilkan area struk
    printArea.style.display = "block";
}

// Cetak struk
function printStruk() {
    window.print();
}