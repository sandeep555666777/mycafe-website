import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: 'Pizzas' },
      update: {},
      create: {
        name: 'Pizzas',
        description: 'Fresh baked pizzas with premium toppings',
        sortOrder: 1,
      },
    }),
    prisma.category.upsert({
      where: { name: 'Beverages' },
      update: {},
      create: {
        name: 'Beverages',
        description: 'Hot and cold beverages',
        sortOrder: 2,
      },
    }),
    prisma.category.upsert({
      where: { name: 'Waffles' },
      update: {},
      create: {
        name: 'Waffles',
        description: 'Sweet and savory waffles',
        sortOrder: 3,
      },
    }),
    prisma.category.upsert({
      where: { name: 'Burgers & Sandwiches' },
      update: {},
      create: {
        name: 'Burgers & Sandwiches',
        description: 'Delicious burgers and sandwiches',
        sortOrder: 4,
      },
    }),
    prisma.category.upsert({
      where: { name: 'Snacks' },
      update: {},
      create: {
        name: 'Snacks',
        description: 'Quick bites and snacks',
        sortOrder: 5,
      },
    }),
  ]);

  console.log('✅ Categories created');

  // Create menu items
  const menuItems = await Promise.all([
    // Pizzas
    prisma.menuItem.upsert({
      where: { name: 'Margherita Pizza' },
      update: {},
      create: {
        name: 'Margherita Pizza',
        description: 'Classic tomato sauce with mozzarella cheese and fresh basil',
        price: 299,
        image: '/images/margherita.jpg',
        categoryId: categories[0].id,
        isVegetarian: true,
        sortOrder: 1,
      },
    }),
    prisma.menuItem.upsert({
      where: { name: 'Pepperoni Pizza' },
      update: {},
      create: {
        name: 'Pepperoni Pizza',
        description: 'Spicy pepperoni with melted cheese on crispy crust',
        price: 349,
        image: '/images/pepperoni.jpg',
        categoryId: categories[0].id,
        isSpicy: true,
        sortOrder: 2,
      },
    }),
    prisma.menuItem.upsert({
      where: { name: 'Farmhouse Pizza' },
      update: {},
      create: {
        name: 'Farmhouse Pizza',
        description: 'Loaded with vegetables and premium cheese',
        price: 399,
        image: '/images/Farmhouse Pizza.jpg',
        categoryId: categories[0].id,
        isVegetarian: true,
        sortOrder: 3,
      },
    }),

    // Beverages
    prisma.menuItem.upsert({
      where: { name: 'Cappuccino' },
      update: {},
      create: {
        name: 'Cappuccino',
        description: 'Rich espresso with steamed milk and foam',
        price: 149,
        image: '/images/Cappuccino.jpg',
        categoryId: categories[1].id,
        isVegetarian: true,
        sortOrder: 1,
      },
    }),
    prisma.menuItem.upsert({
      where: { name: 'Latte' },
      update: {},
      create: {
        name: 'Latte',
        description: 'Smooth espresso with creamy steamed milk',
        price: 159,
        image: '/images/Latte.jpg',
        categoryId: categories[1].id,
        isVegetarian: true,
        sortOrder: 2,
      },
    }),
    prisma.menuItem.upsert({
      where: { name: 'Cold Coffee' },
      update: {},
      create: {
        name: 'Cold Coffee',
        description: 'Iced coffee with cream and sugar',
        price: 179,
        image: '/images/Cold Coffee.jpg',
        categoryId: categories[1].id,
        isVegetarian: true,
        sortOrder: 3,
      },
    }),

    // Waffles
    prisma.menuItem.upsert({
      where: { name: 'Classic Waffle' },
      update: {},
      create: {
        name: 'Classic Waffle',
        description: 'Golden waffle served with maple syrup and butter',
        price: 199,
        image: '/images/waffle-classic.jpg',
        categoryId: categories[2].id,
        isVegetarian: true,
        sortOrder: 1,
      },
    }),
    prisma.menuItem.upsert({
      where: { name: 'Chocolate Waffle' },
      update: {},
      create: {
        name: 'Chocolate Waffle',
        description: 'Chocolate waffle with chocolate sauce and whipped cream',
        price: 249,
        image: '/images/waffle-chocolate.jpg',
        categoryId: categories[2].id,
        isVegetarian: true,
        sortOrder: 2,
      },
    }),
    prisma.menuItem.upsert({
      where: { name: 'Berry Blast Waffle' },
      update: {},
      create: {
        name: 'Berry Blast Waffle',
        description: 'Waffle topped with fresh berries and cream',
        price: 279,
        image: '/images/waffle-berry.jpg',
        categoryId: categories[2].id,
        isVegetarian: true,
        sortOrder: 3,
      },
    }),

    // Burgers & Sandwiches
    prisma.menuItem.upsert({
      where: { name: 'Veg Patty Burger' },
      update: {},
      create: {
        name: 'Veg Patty Burger',
        description: 'Vegetarian patty with fresh vegetables and sauce',
        price: 199,
        image: '/images/Veg Patty Burger.jpg',
        categoryId: categories[3].id,
        isVegetarian: true,
        sortOrder: 1,
      },
    }),
    prisma.menuItem.upsert({
      where: { name: 'Cheese Sandwich' },
      update: {},
      create: {
        name: 'Cheese Sandwich',
        description: 'Grilled cheese sandwich with tomato soup',
        price: 149,
        image: '/images/Cheese Chutney Sandwich.jpg',
        categoryId: categories[3].id,
        isVegetarian: true,
        sortOrder: 2,
      },
    }),

    // Snacks
    prisma.menuItem.upsert({
      where: { name: 'French Fries' },
      update: {},
      create: {
        name: 'French Fries',
        description: 'Crispy golden fries with seasoning',
        price: 99,
        image: '/images/French Fries Plain Salted.jpg',
        categoryId: categories[4].id,
        isVegetarian: true,
        sortOrder: 1,
      },
    }),
    prisma.menuItem.upsert({
      where: { name: 'Cheese Fries' },
      update: {},
      create: {
        name: 'Cheese Fries',
        description: 'Fries topped with melted cheese and herbs',
        price: 149,
        image: '/images/Cheese Fries.jpg',
        categoryId: categories[4].id,
        isVegetarian: true,
        sortOrder: 2,
      },
    }),
  ]);

  console.log('✅ Menu items created');

  // Create sample tables
  const tables = await Promise.all([
    prisma.table.upsert({
      where: { tableNumber: 1 },
      update: {},
      create: {
        tableNumber: 1,
        qrCode: '', // Will be generated by the system
      },
    }),
    prisma.table.upsert({
      where: { tableNumber: 2 },
      update: {},
      create: {
        tableNumber: 2,
        qrCode: '', // Will be generated by the system
      },
    }),
    prisma.table.upsert({
      where: { tableNumber: 3 },
      update: {},
      create: {
        tableNumber: 3,
        qrCode: '', // Will be generated by the system
      },
    }),
    prisma.table.upsert({
      where: { tableNumber: 4 },
      update: {},
      create: {
        tableNumber: 4,
        qrCode: '', // Will be generated by the system
      },
    }),
  ]);

  console.log('✅ Tables created');

  console.log('🎉 Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
