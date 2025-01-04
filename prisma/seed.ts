import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Seed UserRole
  await prisma.userRole.createMany({
    data: [
      { name: 'ADMIN' },
      { name: 'USER' }
    ]
  })

  // Seed Gender
  await prisma.gender.createMany({
    data: [
      { name: 'MALE' },
      { name: 'FEMALE' }
    ]
  })

  // Seed TransactionStatus
  await prisma.transactionStatus.createMany({
    data: [
      { name: 'PENDING' },
      { name: 'SUCCESS' },
      { name: 'FAILED' }
    ]
  })

  // Seed Category
  await prisma.category.createMany({
    data: [
      { name: 'Electronics' },
      { name: 'Clothing' },
      { name: 'Home & Kitchen' },
      { name: 'Books' }
    ]
  })

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
