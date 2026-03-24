import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  // ── Users ────────────────────────────────────────────────────────────────
  const adminPassword = await bcrypt.hash("Admin1234!", 12)
  const userPassword = await bcrypt.hash("User1234!", 12)

  const admin = await prisma.user.upsert({
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

  console.log("✓ Users seeded:", admin.email, "/ user@example.com")

  // ── Orders & Products ────────────────────────────────────────────────────
  const ordersData = [
    {
      id: "4821",
      products: [
        {
          name: "Коллапс-сумка «Стандарт» L",
          imageColor: "#6366f1",
          status: "READY" as const,
          params: {
            "Цвет подкладки": "Бежевый",
            "Размер": "L (40×30×15 см)",
            "Материал внешний": "Кордура 1000D",
            "Улучшенные карабины": true,
            "Тип застёжки": "Молния YKK",
            "Усиленное дно": false,
            "Количество внутренних отделений": 3,
            "Цвет фурнитуры": "Чёрный никель",
          },
        },
        {
          name: "Органайзер «Куб» M",
          imageColor: "#f59e0b",
          status: "READY" as const,
          params: {
            "Цвет подкладки": "Серый",
            "Размер": "M (20×20×20 см)",
            "Материал внешний": "Рипстоп 420D",
            "Улучшенные карабины": false,
            "Тип застёжки": "Молния SBS",
            "Сетчатые карманы": 2,
            "Цвет фурнитуры": "Матовое серебро",
          },
        },
        {
          name: "Чехол для обуви «Компакт»",
          imageColor: "#10b981",
          status: "IN_PROGRESS" as const,
          params: {
            "Цвет подкладки": "Чёрный",
            "Размер": "Universal (до 46-го)",
            "Материал внешний": "Оксфорд 600D",
            "Улучшенные карабины": true,
            "Тип застёжки": "Кнопка + липучка",
            "Водоотталкивающая пропитка": true,
            "Цвет фурнитуры": "Золото",
          },
        },
      ],
    },
    {
      id: "3174",
      products: [
        {
          name: "Несессер «Трэвел» XL",
          imageColor: "#ec4899",
          status: "IN_PROGRESS" as const,
          params: {
            "Цвет подкладки": "Розовый",
            "Размер": "XL (30×15×10 см)",
            "Материал внешний": "Кордура 500D",
            "Улучшенные карабины": true,
            "Зеркало в комплекте": true,
            "Крючок для подвески": true,
            "Количество карманов": 8,
            "Цвет фурнитуры": "Розовое золото",
          },
        },
        {
          name: "Сумка-органайзер для документов",
          imageColor: "#3b82f6",
          status: "NEW" as const,
          params: {
            "Цвет подкладки": "Синий",
            "Размер": "A4 (32×22×3 см)",
            "Материал внешний": "Экокожа",
            "Улучшенные карабины": false,
            "RFID-защита": true,
            "Тип застёжки": "Молния YKK",
            "Количество отделений для карт": 6,
            "Цвет фурнитуры": "Серебро",
          },
        },
      ],
    },
    {
      id: "5509",
      products: [
        {
          name: "Коллапс-рюкзак «Ультра» 25L",
          imageColor: "#8b5cf6",
          status: "NEW" as const,
          params: {
            "Цвет подкладки": "Оливковый",
            "Объём": "25 литров",
            "Материал внешний": "Кордура 1000D",
            "Улучшенные карабины": true,
            "Система спинки": "AirMesh с каркасом",
            "Грудная стяжка": true,
            "Поясной ремень": false,
            "Количество внешних карманов": 4,
            "Цвет фурнитуры": "Матовый чёрный",
            "Светоотражающие элементы": true,
          },
        },
      ],
    },
    {
      id: "2963",
      products: [
        {
          name: "Органайзер для кабелей «Сетап»",
          imageColor: "#f97316",
          status: "READY" as const,
          params: {
            "Цвет подкладки": "Чёрный",
            "Размер": "S (18×12 см)",
            "Материал внешний": "Рипстоп 210D",
            "Улучшенные карабины": false,
            "Тип застёжки": "Молния + клапан",
            "Эластичные петли для кабелей": 8,
            "Цвет фурнитуры": "Чёрный",
          },
        },
        {
          name: "Чехол для планшета «Слим» 11\"",
          imageColor: "#14b8a6",
          status: "READY" as const,
          params: {
            "Цвет подкладки": "Серый меланж",
            "Совместимость": "Планшеты до 11\"",
            "Материал внешний": "Неопрен + Кордура",
            "Улучшенные карабины": true,
            "Подкладка": "Флис",
            "Тип застёжки": "Молния YKK + магнит",
            "Ручка для переноски": true,
            "Цвет фурнитуры": "Серебро",
          },
        },
        {
          name: "Поясная сумка «Экспресс» S",
          imageColor: "#ef4444",
          status: "READY" as const,
          params: {
            "Цвет подкладки": "Красный",
            "Размер": "S (22×12×6 см)",
            "Материал внешний": "Кордура 500D",
            "Улучшенные карабины": true,
            "Тип ремня": "Быстросъёмный, регулируемый",
            "Тип застёжки": "Молния YKK",
            "Скрытый карман": true,
            "Цвет фурнитуры": "Чёрный никель",
          },
        },
      ],
    },
  ]

  for (const order of ordersData) {
    await prisma.order.upsert({
      where: { id: order.id },
      update: {},
      create: {
        id: order.id,
        products: { create: order.products },
      },
    })
  }

  console.log("✓ Orders seeded:", ordersData.length, "orders")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
