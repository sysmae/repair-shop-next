import { db } from './index'
import { migrate } from 'drizzle-orm/neon-http/migrator'

const main = async () => {
  try {
    await migrate(db, {
      migrationsFolder: 'src/db/migrations',
    })
    console.log('마이그레이션 완료')
  } catch (error) {
    console.error('마이그레이션 실패: ', error)
    process.exit(1)
  }
}

main()
