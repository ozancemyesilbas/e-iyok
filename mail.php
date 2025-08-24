<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $ad     = htmlspecialchars($_POST['ad']);
    $tckn   = htmlspecialchars($_POST['tckn']);
    $tarih  = htmlspecialchars($_POST['tarih']);
    $eposta = htmlspecialchars($_POST['eposta']);
    $kaynak = htmlspecialchars($_POST['kaynak']);

    $to      = "yesilbasozancem@gmail.com"; // kendi adresin
    $subject = "Organizasyon Talebi";
    $message = "Ad: $ad\nTCKN: $tckn\nTarih: $tarih\nE-posta: $eposta\nHizmet: $kaynak";
    $headers = "From: no-reply@seninsite.com\r\n";
    $headers .= "Reply-To: $eposta\r\n";

    if (mail($to, $subject, $message, $headers)) {
        echo "<script>alert('İletiniz gönderildi!');window.location.href='index.html';</script>";
    } else {
        echo "<script>alert('Bir hata oluştu, lütfen tekrar deneyin.');window.location.href='index.html';</script>";
    }
}
?>
