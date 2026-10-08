# Tutorial Push ke GitHub

Panduan singkat ini menjelaskan cara menyimpan dan mengunggah (push) perubahan kode lokal Anda ke repositori GitHub.

## Langkah-langkah

1.  **Cek Status Perubahan (Opsional tapi disarankan)**
    Melihat file apa saja yang telah diubah.
    ```bash
    git status
    ```

2.  **Tambahkan Perubahan ke Staging Area**
    Tambahkan semua file yang berubah agar siap di-commit.
    ```bash
    git add .
    ```
    *(Atau `git add nama_file` jika hanya ingin menambahkan file tertentu, misalnya `git add index.html`)*

3.  **Buat Commit**
    Simpan perubahan ke riwayat git lokal dengan memberikan pesan yang jelas.
    ```bash
    git commit -m "Pesan penjelasan tentang perubahan yang dibuat"
    ```
    *Contoh: `git commit -m "Update profile dan index halaman"`*

4.  **Push ke GitHub**
    Unggah (push) commit yang telah dibuat ke repositori remote pada branch utama (misalnya `main`).
    ```bash
    git push origin main
    ```

---

## Cara Cek Koneksi GitHub

Jika Anda ingin mengetahui proyek lokal Anda saat ini terhubung ke repositori GitHub yang mana (dan apa nama alias remote-nya), gunakan perintah berikut:

```bash
git remote -v
```
Perintah ini akan menampilkan URL GitHub Anda dan nama remote yang Anda gunakan (contohnya `origin` atau `portofolio`).

---

### Catatan Tambahan untuk Repositori Anda
Berdasarkan status git Anda saat ini, branch lokal Anda melacak (tracking) dari remote bernama `portofolio` (`portofolio/main`).
Jadi untuk mem-publish (push) commit Anda saat ini dan perubahan file yang baru, Anda bisa melakukan urutan ini:

```bash
git add index.html profile.html
git commit -m "Update index dan profile"
git push portofolio main
```
