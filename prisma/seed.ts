import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const adapter = new PrismaPg({ connectionString: process.env.STORAGE_PRISMA_DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  // ── Users ────────────────────────────────────────────────────────────────
  const adminPassword = await bcrypt.hash("Admin1234!", 12)
  const userPassword = await bcrypt.hash("User1234!", 12)

  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Администратор",
      email: "admin@example.com",
      password: adminPassword,
      role: "ADMIN",
    },
  })

  await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      name: "Иван Петров",
      email: "user@example.com",
      password: userPassword,
      role: "USER",
    },
  })

  console.log("✓ Users seeded")

  // ── Orders & Products ────────────────────────────────────────────────────
  // Clear existing orders/products to avoid duplicates
  await prisma.product.deleteMany()
  await prisma.order.deleteMany()

  const ordersData = [
    {
      id: "4821",
      createdAt: new Date("2026-03-10"),
      products: [
        {
          name: "Сумка VORTEX",
          imageUrl: "https://collapse.by/uploads/all%20products/VORTEX/VORTEX%20Ripstop/V1.PNG",
          status: "READY" as const,
          params: {
            "Материал": "Ripstop",
            "Тип": "Городская сумка",
            "Улучшенные карабины": true,
            "Тип застёжки": "Молния YKK",
            "Усиленное дно": false,
            "Количество отделений": 3,
            "Цвет фурнитуры": "Чёрный никель",
          },
          userComment: "Прошу упаковать аккуратно, подарок.",
          productionComment: "Швы усилены вручную, проверить перед отправкой.",
        },
        {
          name: "Городская сумка SAMURAI Mini",
          imageUrl: "https://collapse.by/uploads/all%20products/SAMURAI/Mini/promo%20poster1-02.jpg",
          status: "READY" as const,
          params: {
            "Тип": "Городская сумка",
            "Размер": "Mini",
            "Материал внешний": "Кордура",
            "Улучшенные карабины": false,
            "Тип застёжки": "Молния SBS",
            "Цвет фурнитуры": "Матовое серебро",
          },
        },
        {
          name: "Сумка Doom Slayer",
          imageUrl: "https://collapse.by/uploads/all%20products/DOOM_2/promo%20poster1-03.jpg",
          status: "IN_PROGRESS" as const,
          params: {
            "Тип": "Городская сумка",
            "Материал внешний": "Кордура 1000D",
            "Улучшенные карабины": true,
            "Тип застёжки": "Молния YKK",
            "Водоотталкивающая пропитка": true,
            "Цвет фурнитуры": "Чёрный",
          },
        },
      ],
    },
    {
      id: "3174",
      createdAt: new Date("2026-03-15"),
      products: [
        {
          name: "Городская сумка TOKEN Color",
          imageUrl: "https://collapse.by/uploads/all%20products/TOKEN/COLOR/COLOR.jpg",
          status: "IN_PROGRESS" as const,
          params: {
            "Тип": "Городская сумка",
            "Версия": "Color",
            "Материал внешний": "Кордура 500D",
            "Улучшенные карабины": true,
            "Количество карманов": 4,
            "Цвет фурнитуры": "Чёрный никель",
          },
        },
        {
          name: "Городская сумка TOKEN Grid",
          imageUrl: "https://collapse.by/uploads/all%20products/TOKEN/GRID/TOKEN%20GRID%208.png",
          status: "NEW" as const,
          params: {
            "Тип": "Городская сумка",
            "Версия": "Grid",
            "Материал внешний": "Кордура",
            "Улучшенные карабины": false,
            "MOLLE-система": true,
            "Тип застёжки": "Молния YKK",
            "Цвет фурнитуры": "Серебро",
          },
        },
        {
          name: "Городская сумка TOKEN Ripstop",
          imageUrl: "https://collapse.by/uploads/all%20products/TOKEN/COLOR/COLOR.jpg",
          status: "IN_PROGRESS" as const,
          params: {
            "Тип": "Городская сумка",
            "Версия": "Ripstop",
            "Материал внешний": "Ripstop 500D",
            "Улучшенные карабины": true,
            "MOLLE-система": false,
            "Тип застёжки": "Молния YKK",
            "Цвет фурнитуры": "Чёрный никель",
          },
          productionComment: "Заменить молнию на усиленную",
        },
        {
          name: "Городская сумка TOKEN Stealth",
          imageUrl: "https://collapse.by/uploads/all%20products/TOKEN/GRID/TOKEN%20GRID%208.png",
          status: "NEW" as const,
          params: {
            "Тип": "Городская сумка",
            "Версия": "Stealth",
            "Материал внешний": "Кордура 1000D",
            "Улучшенные карабины": true,
            "MOLLE-система": true,
            "Тип застёжки": "Молния SBS",
            "Цвет фурнитуры": "Матовый чёрный",
          },
        },
      ],
    },
    {
      id: "6102",
      createdAt: new Date("2026-03-25"),
      products: [
        {
          name: "Городская сумка TOKEN Classic",
          imageUrl: "https://collapse.by/uploads/all%20products/TOKEN/COLOR/COLOR.jpg",
          status: "READY" as const,
          params: {
            "Тип": "Городская сумка",
            "Версия": "Classic",
            "Материал внешний": "Кордура 500D",
            "Улучшенные карабины": false,
            "MOLLE-система": false,
            "Тип застёжки": "Молния YKK",
            "Цвет фурнитуры": "Серебро",
          },
          userComment: "Хочу светлую фурнитуру",
        },
        {
          name: "Городская сумка TOKEN Pro",
          imageUrl: "https://collapse.by/uploads/all%20products/TOKEN/GRID/TOKEN%20GRID%208.png",
          status: "IN_PROGRESS" as const,
          params: {
            "Тип": "Городская сумка",
            "Версия": "Pro",
            "Материал внешний": "Кордура 1000D",
            "Улучшенные карабины": true,
            "MOLLE-система": true,
            "Тип застёжки": "Молния YKK",
            "Цвет фурнитуры": "Чёрный никель",
          },
        },
        {
          name: "Сумка EVA-02",
          imageUrl: "https://collapse.by/uploads/all%20products/EVA-02/1.jpg",
          status: "NEW" as const,
          params: {
            "Тип": "Городская сумка",
            "Материал внешний": "Кордура",
            "Улучшенные карабины": false,
            "Тип застёжки": "Молния YKK",
            "Ручка для переноски": true,
            "Цвет фурнитуры": "Матовый чёрный",
          },
        },
      ],
    },
    {
      id: "5509",
      createdAt: new Date("2026-03-20"),
      products: [
        {
          name: "Сумка Edgerunner",
          imageUrl: "https://collapse.by/uploads/all%20products/Edgerunner/1.jpg",
          status: "NEW" as const,
          params: {
            "Тип": "Городская сумка",
            "Материал внешний": "Кордура 1000D",
            "Улучшенные карабины": true,
            "Количество внешних карманов": 4,
            "Цвет фурнитуры": "Матовый чёрный",
            "Светоотражающие элементы": true,
          },
        },
      ],
    },
    {
      id: "2963",
      createdAt: new Date("2026-02-28"),
      products: [
        {
          name: "Мессенджер MAELSTROM",
          imageUrl: "https://collapse.by/uploads/all%20products/Maelstrom/Maelstrom1.jpg",
          status: "READY" as const,
          params: {
            "Тип": "Мессенджер",
            "Материал внешний": "Рипстоп",
            "Улучшенные карабины": false,
            "Тип застёжки": "Молния + клапан",
            "Цвет фурнитуры": "Чёрный",
          },
        },
        {
          name: "Сумка EVA-02",
          imageUrl: "https://collapse.by/uploads/all%20products/EVA-02/1.jpg",
          status: "READY" as const,
          params: {
            "Тип": "Городская сумка",
            "Материал внешний": "Кордура",
            "Улучшенные карабины": true,
            "Тип застёжки": "Молния YKK",
            "Ручка для переноски": true,
            "Цвет фурнитуры": "Серебро",
          },
        },
        {
          name: "Рюкзак PHANTOM",
          imageUrl: "https://collapse.by/uploads/all%20products/PHANTOM/PH1.jpg",
          status: "READY" as const,
          params: {
            "Тип": "Рюкзак",
            "Материал внешний": "Кордура 500D",
            "Улучшенные карабины": true,
            "Тип застёжки": "Молния YKK",
            "Скрытый карман": true,
            "Цвет фурнитуры": "Чёрный никель",
          },
        },
      ],
    },
  ]

  for (const order of ordersData) {
    await prisma.order.create({
      data: {
        id: order.id,
        createdAt: order.createdAt,
        products: { create: order.products.map((p, i) => ({ ...p, position: i })) },
      },
    })
  }

  console.log("✓ Orders seeded:", ordersData.length, "orders")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
