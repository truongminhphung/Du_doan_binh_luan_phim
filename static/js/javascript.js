$(document).ready(function () {
    var i = 1;
    $("#myBtn").click(function () {
        $("#myModal").modal();
    });

    function ktrama() {
        var re = /^[0-9]{6}$/;
        if ($("txtMa").val() == "") {
            $("#tbMa").html("* Bắt buộc nhập");
            return false;
        }
        if (!re.test($("#txtMa").val())) {
            $("#tbMa").html("* Nhập mã gồm 6 chữ số");
            return false;
        }
        $("#tbMa").html("*");
        return true;
    }
    $("#txtMa").blur(ktrama);

    function ktraten() {
        var re = /[A-Z]/;
        if ($("txtTen").val() == "") {
            $("#tbTen").html("* Bắt buộc nhập");
            return false;
        }
        if (!re.test($("#txtTen").val())) {
            $("#tbTen").html("* Tên phải in hoa");
            return false;
        }
        $("#tbTen").html("*");
        return true;
    }
    $("#txtTen").blur(ktraten);

    function ktraemail() {
        var re = /^[A-Za-z0-9]+\@iuh\.edu\.vn$/;
        if ($("txtEmail").val() == "") {
            $("#tbEmail").html("* Bắt buộc nhập");
            return false;
        }
        if (!re.test($("#txtEmail").val())) {
            $("#tbEmail").html("* Viết đúng định dạng(mẫu xxx@iuh.edu.vn)");
            return false;
        }
        $("#tbEmail").html("*");
        return true;
    }
    $("#txtEmail").blur(ktraemail);

    function ktrasdt() {
        var re = /^[0-9]{4}\-[0-9]{3}\-[0-9]{3}/;
        if ($("txtSDT").val() == "") {
            $("#tbSDT").html("* Bắt buộc nhập");
            return false;
        }
        if (!re.test($("#txtSDT").val())) {
            $("#tbSDT").html("số điện thoại phải là số(theo mẫu XXXX-XXX-XXX)");
            return false;
        }
        $("#tbSDT").html("*");
        return true;
    }
    $("#txtSDT").blur(ktrasdt);

    function ktrangay() {
        var day = new Date($("#txtNgay").val());
        var today = new Date();
        if ($("#txtNgay").val() == "") {
            $("#tbNgay").html("* Bắt buộc nhập");
            return false;
        }
        today.setDate(today.getDate() + 3);
        if (day < today) {
            $("#tbNgay").html("* Sau ngày hiện tại 3 ngày");
            return false;
        }
        $("#tbNgay").html("*");
        return true;
    }
    $("#txtNgay").blur(ktrangay);

    $("#SaveBtn").click(function () {
        if (!ktrama() || !ktraten() || !ktrangay() || !ktraemail() || !ktrasdt()) {
            $("#thongbao").html("Phải điền đúng các thông tin");
            return false;
        }
        var ma = $("#txtMa").val();
        var ten = $("#txtTen").val();
        var ngay = $("#txtNgay").val();
        var email = $("#txtEmail").val();
        var sdt = $("#txtSDT").val();
        var them = "<tr><td>" + (i++) + "</td><td>" + ma + "</td><td>" + ten + "</td><td>" + ngay + "</td><td>" + email + "</td><td>" + sdt + "</td></tr>";
        $("table tbody").append(them);
        $("#myModal").modal("hide");
    });

});