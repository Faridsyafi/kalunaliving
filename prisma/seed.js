// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  // 🔐 DATA ADMIN AWAL
  const adminEmail = "lanabintang54@gmail.com"; // email untuk login
  const adminUsername = "admin";                // hanya identitas, bukan login utama
  const adminPasswordPlain = "Admin123!";       // password untuk login (boleh diganti)

  // Hash password (sesuai field password di Prisma: String)
  const passwordHash = await bcrypt.hash(adminPasswordPlain, 10);

  // Buat atau biarkan jika sudah ada (upsert)
  const admin = await prisma.user.upsert({
    where: { email: adminEmail }, // cek berdasarkan email
    update: {},                   // kalau sudah ada, tidak diubah
    create: {
      name: "Super Admin Kaluna Living",
      email: adminEmail,
      username: adminUsername,
      password: passwordHash,
      role: "ADMIN", // enum Role di schema prisma (ADMIN, OWNER, CUSTOMER)
    },
  });

  console.log("✅ Admin created or already exists");
  console.log("➡ Email   :", adminEmail);
  console.log("➡ Password:", adminPasswordPlain);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Seed error:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
