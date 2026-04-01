export type OrderStatus = "NEW" | "IN_PROGRESS" | "READY" | "IMPORTANT"

export interface ProductParams {
  [key: string]: string | boolean | number
}

export interface Product {
  id: string
  name: string
  imageUrl: string
  status: OrderStatus
  params: ProductParams
}

export interface Order {
  id: string
  createdAt: string
  products: Product[]
}

export const orders: Order[] = [
  {
    id: "4821",
    createdAt: "2026-03-10",
    products: [
      {
        id: "p1",
        name: "Сумка VORTEX",
        imageUrl: "https://collapse.by/uploads/all%20products/VORTEX/VORTEX%20Ripstop/V1.PNG",
        status: "READY",
        params: {
          "Материал": "Ripstop",
          "Тип": "Городская сумка",
          "Улучшенные карабины": true,
          "Тип застёжки": "Молния YKK",
          "Усиленное дно": false,
          "Количество отделений": 3,
          "Цвет фурнитуры": "Чёрный никель",
        },
      },
      {
        id: "p2",
        name: "Городская сумка SAMURAI Mini",
        imageUrl: "https://collapse.by/uploads/all%20products/SAMURAI/Mini/promo%20poster1-02.jpg",
        status: "READY",
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
        id: "p3",
        name: "Сумка Doom Slayer",
        imageUrl: "https://collapse.by/uploads/all%20products/DOOM_2/promo%20poster1-03.jpg",
        status: "IN_PROGRESS",
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
    createdAt: "2026-03-15",
    products: [
      {
        id: "p4",
        name: "Городская сумка TOKEN Color",
        imageUrl: "https://collapse.by/uploads/all%20products/TOKEN/COLOR/COLOR.jpg",
        status: "IN_PROGRESS",
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
        id: "p5",
        name: "Городская сумка TOKEN Grid",
        imageUrl: "https://collapse.by/uploads/all%20products/TOKEN/GRID/TOKEN%20GRID%208.png",
        status: "NEW",
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
    ],
  },
  {
    id: "5509",
    createdAt: "2026-03-20",
    products: [
      {
        id: "p6",
        name: "Сумка Edgerunner",
        imageUrl: "https://collapse.by/uploads/all%20products/Edgerunner/1.jpg",
        status: "NEW",
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
    createdAt: "2026-02-28",
    products: [
      {
        id: "p7",
        name: "Мессенджер MAELSTROM",
        imageUrl: "https://collapse.by/uploads/all%20products/Maelstrom/Maelstrom1.jpg",
        status: "READY",
        params: {
          "Тип": "Мессенджер",
          "Материал внешний": "Рипстоп",
          "Улучшенные карабины": false,
          "Тип застёжки": "Молния + клапан",
          "Цвет фурнитуры": "Чёрный",
        },
      },
      {
        id: "p8",
        name: "Сумка EVA-02",
        imageUrl: "https://collapse.by/uploads/all%20products/EVA-02/1.jpg",
        status: "READY",
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
        id: "p9",
        name: "Рюкзак PHANTOM",
        imageUrl: "https://collapse.by/uploads/all%20products/PHANTOM/PH1.jpg",
        status: "READY",
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

export function getOrder(id: string): Order | undefined {
  return orders.find((o) => o.id === id)
}
