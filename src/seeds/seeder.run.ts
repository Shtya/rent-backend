import { DataSource, Repository } from 'typeorm';
import { Setting } from 'entities/setting.entity';
import { User } from 'entities/user.entity';
import { Address } from 'entities/address.entity';
import { Banner } from 'entities/banner.entity';
import { Cart, CartItem } from 'entities/cart.entity';
import { Complaint } from 'entities/complaint.entity';
import { Coupon } from 'entities/coupon.entity';
import { Domain, DomainConfiguration } from 'entities/domain.entity';
import { Faq } from 'entities/faq.entity';
import { Favorite } from 'entities/favorite.entity';
import { Order } from 'entities/order.entity';
import { Payment } from 'entities/payment.entity';
import { Rating } from 'entities/rating.entity';
import { Service } from 'entities/service.entity';
import { SubCategory } from 'entities/sub-category.entity';
import { Category } from 'entities/category.entity';
import {  LoyaltyReward , LoyaltyRule  , UserLoyaltyPoints  , UserRewardClaim  } from 'entities/loyalty.entity';


async function seedSettings(dataSource: DataSource) {
  const settingRepo: Repository<Setting> = dataSource.getRepository(Setting);

  const data = {
    slug: 'settings',
    site_name: { en: 'Joe13', ar: 'جو 13' },
    site_logo: {
      url: '/uploads/joe-13/settings/logo.svg',
      alt: 'Joe13 Logo',
    },
    favicon: {
      url: '/uploads/joe-13/settings/favicon.png',
      alt: 'Joe13 Favicon',
    },
    social_media: {
      facebook: 'https://www.facebook.com/joe13ksa?mibextid=ZbWKwL',
      instagram: 'https://www.instagram.com/joe13ksa?igsh=NjV5Y254dWl6MGJy',
      tiktok: 'https://www.tiktok.com/@joe13ksa?_t=8shIsnjbS6c&_r=1',
      linkedin: 'https://www.linkedin.com/company/joe13ksa/',
      snapshot: 'https://www.snapchat.com/add/joe13ksa?share_id=7tDt0EHfCLY&locale=en-GB',
      twitter: 'https://x.com/joe13ksa?t=DhxUu2XNItuJNGBAAAnLEA&s=09',
    },
    contact_us: {
      address: {
        en: 'Head Office Bawadi District, Madinah Road',
        ar: 'المكتب الرئيسي، حي البوادي، طريق المدينة',
      },
      email: 'info@joe13.com',
      main_branch: {
        en: 'Jeddah Headquarters',
        ar: 'المقر الرئيسي بجدة',
      },
      phone: '+966570002013',
    },
    branch: {
      en: ['Jeddah', 'Egypt', 'Riyadh', 'Makkah', 'Dammam'],
      ar: ['جدة', 'مصر', 'الرياض', 'مكة', 'الدمام'],
    },
    meta: {
      title: {
        en: 'Joe13 - 360° Business Solutions with 11+ Years of Impact',
        ar: 'جو 13 - حلول أعمال شاملة مع أكثر من 12 عامًا من التأثير',
      },
      description: {
        en: 'Joe13 offers comprehensive business solutions including marketing, software, telecom, HR, and event services with over 180 successful projects across 47 cities.',
        ar: 'تقدم جو 13 حلول أعمال شاملة تشمل التسويق والبرمجيات والاتصالات والموارد البشرية وإدارة الفعاليات مع أكثر من 180 مشروعًا ناجحًا في 47 مدينة.',
      },
      keywords: [
        'Joe13',
        'Marketing Solutions',
        'Digital Marketing',
        'HR Solutions',
        'Software and AI',
        'Event Management',
        'Telecom Services',
        'Business Consulting',
        'Brand Activation',
        'ERP Solutions',
        'Web Development',
        'Promoters Management',
      ],
      custom_scripts: {
        head: "<script>console.log('Joe13 website loaded');</script>",
        body: '<script>// Tracking script for Joe13</script>',
      },
    },
    about_us_footer: {
      en: 'Joe13 delivers smart solutions with 11+ years of experience, 180+ projects, and 100+ clients across 47 cities.',
      ar: 'جو 13 تقدم حلولًا ذكية بخبرة 11+ عامًا، و180+ مشروعًا، و100+ عميل في 47 مدينة.',
    },
    copyright: {
      en: '© 2024 Joe13. All Rights Reserved.',
      ar: '© 2024 جو 13. جميع الحقوق محفوظة.',
    },
  };

  await settingRepo.clear();
  await settingRepo.save(settingRepo.create(data as any));
}


export const seedUsers = async (dataSource: DataSource) => {
  const userRepository = dataSource.getRepository(User);

  const users = [
  {
    "name": "Ali Ahmed",
    "email": "ali.ahmed1@example.com",
    "phone": "+966512345670",
    "password": "Password@123",
    "role": "user",
    "address": { "ar": "الرياض", "en": "Riyadh" },
    "business_details": { "ar": "شركة تقنية", "en": "Tech Company" }
  },
  {
    "name": "Sara Khalid",
    "email": "sara.khalid2@example.com",
    "phone": "+966512345671",
    "password": "Password@123",
    "role": "provider",
    "address": { "ar": "جدة", "en": "Jeddah" },
    "business_details": { "ar": "صالون تجميل", "en": "Beauty Salon" }
  },
  {
    "name": "Mohammed Saleh",
    "email": "mohammed.saleh3@example.com",
    "phone": "+966512345672",
    "password": "Password@123",
    "role": "technician",
    "address": { "ar": "الدمام", "en": "Dammam" },
    "business_details": { "ar": "خدمة صيانة", "en": "Repair Service" }
  },
  {
    "name": "Laila Nasser",
    "email": "laila.nasser4@example.com",
    "phone": "+966512345673",
    "password": "Password@123",
    "role": "user",
    "address": { "ar": "الطائف", "en": "Taif" },
    "business_details": { "ar": "لا شيء", "en": "None" }
  },
  {
    "name": "Fahad Omar",
    "email": "fahad.omar5@example.com",
    "phone": "+966512345674",
    "password": "Password@123",
    "role": "provider",
    "address": { "ar": "أبها", "en": "Abha" },
    "business_details": { "ar": "مقهى", "en": "Cafe" }
  },
  {
    "name": "Reem Hassan",
    "email": "reem.hassan6@example.com",
    "phone": "+966512345675",
    "password": "Password@123",
    "role": "user",
    "address": { "ar": "بريدة", "en": "Buraidah" },
    "business_details": { "ar": "لا شيء", "en": "None" }
  },
  {
    "name": "Tariq Sami",
    "email": "tariq.sami7@example.com",
    "phone": "+966512345676",
    "password": "Password@123",
    "role": "technician",
    "address": { "ar": "تبوك", "en": "Tabuk" },
    "business_details": { "ar": "صيانة أجهزة", "en": "Device Maintenance" }
  },
  {
    "name": "Noura Adel",
    "email": "noura.adel8@example.com",
    "phone": "+966512345677",
    "password": "Password@123",
    "role": "user",
    "address": { "ar": "الخبر", "en": "Khobar" },
    "business_details": { "ar": "لا شيء", "en": "None" }
  },
  {
    "name": "Khalid Faisal",
    "email": "khalid.faisal9@example.com",
    "phone": "+966512345678",
    "password": "Password@123",
    "role": "provider",
    "address": { "ar": "المدينة", "en": "Medina" },
    "business_details": { "ar": "شركة تصميم", "en": "Design Company" }
  },
  {
    "name": "Mona Saud",
    "email": "mona.saud10@example.com",
    "phone": "+966512345679",
    "password": "Password@123",
    "role": "user",
    "address": { "ar": "مكة", "en": "Mecca" },
    "business_details": { "ar": "لا شيء", "en": "None" }
  },
  {
    "name": "Hassan Ali",
    "email": "hassan.ali11@example.com",
    "phone": "+966512345680",
    "password": "Password@123",
    "role": "provider",
    "address": { "ar": "جازان", "en": "Jazan" },
    "business_details": { "ar": "خدمة توصيل", "en": "Delivery Service" }
  },
  {
    "name": "Dana Fawaz",
    "email": "dana.fawaz12@example.com",
    "phone": "+966512345681",
    "password": "Password@123",
    "role": "user",
    "address": { "ar": "نجران", "en": "Najran" },
    "business_details": { "ar": "لا شيء", "en": "None" }
  },
  {
    "name": "Majed Salem",
    "email": "majed.salem13@example.com",
    "phone": "+966512345682",
    "password": "Password@123",
    "role": "technician",
    "address": { "ar": "الخرج", "en": "Al Kharj" },
    "business_details": { "ar": "صيانة سيارات", "en": "Car Repair" }
  },
  {
    "name": "Huda Zaid",
    "email": "huda.zaid14@example.com",
    "phone": "+966512345683",
    "password": "Password@123",
    "role": "user",
    "address": { "ar": "ينبع", "en": "Yanbu" },
    "business_details": { "ar": "لا شيء", "en": "None" }
  },
  {
    "name": "Yousef Kareem",
    "email": "yousef.kareem15@example.com",
    "phone": "+966512345684",
    "password": "Password@123",
    "role": "provider",
    "address": { "ar": "عرعر", "en": "Arar" },
    "business_details": { "ar": "محل ملابس", "en": "Clothing Store" }
  },
  {
    "name": "Rania Saad",
    "email": "rania.saad16@example.com",
    "phone": "+966512345685",
    "password": "Password@123",
    "role": "user",
    "address": { "ar": "الدمام", "en": "Dammam" },
    "business_details": { "ar": "لا شيء", "en": "None" }
  },
  {
    "name": "Bader Hamad",
    "email": "bader.hamad17@example.com",
    "phone": "+966512345686",
    "password": "Password@123",
    "role": "technician",
    "address": { "ar": "حائل", "en": "Hail" },
    "business_details": { "ar": "صيانة كهربائية", "en": "Electrical Repair" }
  },
  {
    "name": "Amal Tariq",
    "email": "amal.tariq18@example.com",
    "phone": "+966512345687",
    "password": "Password@123",
    "role": "user",
    "address": { "ar": "الزلفي", "en": "Zulfi" },
    "business_details": { "ar": "لا شيء", "en": "None" }
  },
  {
    "name": "Osama Jamal",
    "email": "osama.jamal19@example.com",
    "phone": "+966512345688",
    "password": "Password@123",
    "role": "provider",
    "address": { "ar": "بيشة", "en": "Bisha" },
    "business_details": { "ar": "مكتب هندسي", "en": "Engineering Office" }
  },
  {
    "name": "Nourah Saud",
    "email": "nourah.saud20@example.com",
    "phone": "+966512345689",
    "password": "Password@123",
    "role": "user",
    "address": { "ar": "الجبيل", "en": "Jubail" },
    "business_details": { "ar": "لا شيء", "en": "None" }
  }
]

  await userRepository.save(users as any );
  console.log('✅ Seeded 20 users');
};
export const seedCategory = async (dataSource: DataSource) => {
  const repo = dataSource.getRepository(Category);

  const data = [
  {
    name: { ar: 'مطاعم', en: 'Restaurants' },
    image: '/uploads/category/1.png',
  },
  {
    name: { ar: 'فنادق', en: 'Hotels' },
    image: '/uploads/category/2.png',
  },
  {
    name: { ar: 'كوافير', en: 'Salons' },
    image: '/uploads/category/3.png',
  },
  {
    name: { ar: 'تصوير', en: 'Photography' },
    image: '/uploads/category/4.png',
  },
  {
    name: { ar: 'ديكور', en: 'Decoration' },
    image: '/uploads/category/5.png',
  },
  {
    name: { ar: 'ورود', en: 'Flowers' },
    image: '/uploads/category/6.png',
  },
  {
    name: { ar: 'هدايا', en: 'Gifts' },
    image: '/uploads/category/7.png',
  },
  {
    name: { ar: 'حفلات', en: 'Parties' },
    image: '/uploads/category/8.png',
  },
  {
    name: { ar: 'إضاءة', en: 'Lighting' },
    image: '/uploads/category/9.png',
  },
  {
    name: { ar: 'موسيقى', en: 'Music' },
    image: '/uploads/category/10.png',
  },
  {
    name: { ar: 'تصميم دعوات', en: 'Invitation Design' },
    image: '/uploads/category/11.png',
  },
  {
    name: { ar: 'تنسيق طاولات', en: 'Table Arrangement' },
    image: '/uploads/category/12.png',
  },
  {
    name: { ar: 'بوفيه مفتوح', en: 'Buffet' },
    image: '/uploads/category/13.png',
  },
  {
    name: { ar: 'خيام', en: 'Tents' },
    image: '/uploads/category/14.png',
  },
  {
    name: { ar: 'تأجير سيارات', en: 'Car Rental' },
    image: '/uploads/category/15.png',
  },
  {
    name: { ar: 'مأكولات بحرية', en: 'Seafood' },
    image: '/uploads/category/16.png',
  },
  {
    name: { ar: 'حلويات', en: 'Desserts' },
    image: '/uploads/category/17.png',
  },
  {
    name: { ar: 'ملابس', en: 'Clothing' },
    image: '/uploads/category/18.png',
  },
  {
    name: { ar: 'إكسسوارات', en: 'Accessories' },
    image: '/uploads/category/19.png',
  },
  {
    name: { ar: 'خدمات أمنية', en: 'Security Services' },
    image: '/uploads/category/20.png',
  },
];

  await repo.query(`TRUNCATE "category" RESTART IDENTITY CASCADE`);

  await repo.save(data as any );
};
export const seedSubCategory = async (dataSource: DataSource) => {
  const categoryRepo = dataSource.getRepository(Category);
    const categories = await categoryRepo.find();
    if (!categories.length) throw new Error('category not seeded.');

  
  const repo = dataSource.getRepository(SubCategory);
  const data = [
  {
    "name": { "ar": "فرعية 1", "en": "SubCategory 1" },
    "image": "/uploads/category/1.png",
    "categoryId": 1
  },
  {
    "name": { "ar": "فرعية 2", "en": "SubCategory 2" },
    "image": "/uploads/category/2.png",
    "categoryId": 2
  },
  {
    "name": { "ar": "فرعية 3", "en": "SubCategory 3" },
    "image": "/uploads/category/3.png",
    "categoryId": 3
  },
  {
    "name": { "ar": "فرعية 4", "en": "SubCategory 4" },
    "image": "/uploads/category/4.png",
    "categoryId": 4
  },
  {
    "name": { "ar": "فرعية 5", "en": "SubCategory 5" },
    "image": "/uploads/category/5.png",
    "categoryId": 5
  },
  {
    "name": { "ar": "فرعية 6", "en": "SubCategory 6" },
    "image": "/uploads/category/6.png",
    "categoryId": 6
  },
  {
    "name": { "ar": "فرعية 7", "en": "SubCategory 7" },
    "image": "/uploads/category/7.png",
    "categoryId": 7
  },
  {
    "name": { "ar": "فرعية 8", "en": "SubCategory 8" },
    "image": "/uploads/category/8.png",
    "categoryId": 8
  },
  {
    "name": { "ar": "فرعية 9", "en": "SubCategory 9" },
    "image": "/uploads/category/9.png",
    "categoryId": 9
  },
  {
    "name": { "ar": "فرعية 10", "en": "SubCategory 10" },
    "image": "/uploads/category/10.png",
    "categoryId": 10
  },
  {
    "name": { "ar": "فرعية 11", "en": "SubCategory 11" },
    "image": "/uploads/category/11.png",
    "categoryId": 1
  },
  {
    "name": { "ar": "فرعية 12", "en": "SubCategory 12" },
    "image": "/uploads/category/12.png",
    "categoryId": 2
  },
  {
    "name": { "ar": "فرعية 13", "en": "SubCategory 13" },
    "image": "/uploads/category/13.png",
    "categoryId": 3
  },
  {
    "name": { "ar": "فرعية 14", "en": "SubCategory 14" },
    "image": "/uploads/category/14.png",
    "categoryId": 4
  },
  {
    "name": { "ar": "فرعية 15", "en": "SubCategory 15" },
    "image": "/uploads/category/15.png",
    "categoryId": 5
  },
  {
    "name": { "ar": "فرعية 16", "en": "SubCategory 16" },
    "image": "/uploads/category/16.png",
    "categoryId": 6
  },
  {
    "name": { "ar": "فرعية 17", "en": "SubCategory 17" },
    "image": "/uploads/category/17.png",
    "categoryId": 7
  },
  {
    "name": { "ar": "فرعية 18", "en": "SubCategory 18" },
    "image": "/uploads/category/18.png",
    "categoryId": 8
  },
  {
    "name": { "ar": "فرعية 19", "en": "SubCategory 19" },
    "image": "/uploads/category/19.png",
    "categoryId": 9
  },
  {
    "name": { "ar": "فرعية 20", "en": "SubCategory 20" },
    "image": "/uploads/category/20.png",
    "categoryId": 10
  },
  {
    "name": { "ar": "فرعية 21", "en": "SubCategory 21" },
    "image": "/uploads/category/21.png",
    "categoryId": 1
  },
  {
    "name": { "ar": "فرعية 22", "en": "SubCategory 22" },
    "image": "/uploads/category/22.png",
    "categoryId": 2
  },
  {
    "name": { "ar": "فرعية 23", "en": "SubCategory 23" },
    "image": "/uploads/category/23.png",
    "categoryId": 3
  },
  {
    "name": { "ar": "فرعية 24", "en": "SubCategory 24" },
    "image": "/uploads/category/24.png",
    "categoryId": 4
  },
  {
    "name": { "ar": "فرعية 25", "en": "SubCategory 25" },
    "image": "/uploads/category/25.png",
    "categoryId": 5
  },
  {
    "name": { "ar": "فرعية 26", "en": "SubCategory 26" },
    "image": "/uploads/category/26.png",
    "categoryId": 6
  },
  {
    "name": { "ar": "فرعية 27", "en": "SubCategory 27" },
    "image": "/uploads/category/27.png",
    "categoryId": 7
  },
  {
    "name": { "ar": "فرعية 28", "en": "SubCategory 28" },
    "image": "/uploads/category/28.png",
    "categoryId": 8
  },
  {
    "name": { "ar": "فرعية 29", "en": "SubCategory 29" },
    "image": "/uploads/category/29.png",
    "categoryId": 9
  },
  {
    "name": { "ar": "فرعية 30", "en": "SubCategory 30" },
    "image": "/uploads/category/30.png",
    "categoryId": 10
  },
  {
    "name": { "ar": "فرعية 31", "en": "SubCategory 31" },
    "image": "/uploads/category/31.png",
    "categoryId": 1
  },
  {
    "name": { "ar": "فرعية 32", "en": "SubCategory 32" },
    "image": "/uploads/category/32.png",
    "categoryId": 2
  },
  {
    "name": { "ar": "فرعية 33", "en": "SubCategory 33" },
    "image": "/uploads/category/33.png",
    "categoryId": 3
  },
  {
    "name": { "ar": "فرعية 34", "en": "SubCategory 34" },
    "image": "/uploads/category/34.png",
    "categoryId": 4
  },
  {
    "name": { "ar": "فرعية 35", "en": "SubCategory 35" },
    "image": "/uploads/category/35.png",
    "categoryId": 5
  },
  {
    "name": { "ar": "فرعية 36", "en": "SubCategory 36" },
    "image": "/uploads/category/36.png",
    "categoryId": 6
  },
  {
    "name": { "ar": "فرعية 37", "en": "SubCategory 37" },
    "image": "/uploads/category/37.png",
    "categoryId": 7
  },
  {
    "name": { "ar": "فرعية 38", "en": "SubCategory 38" },
    "image": "/uploads/category/38.png",
    "categoryId": 8
  },
  {
    "name": { "ar": "فرعية 39", "en": "SubCategory 39" },
    "image": "/uploads/category/39.png",
    "categoryId": 9
  },
  {
    "name": { "ar": "فرعية 40", "en": "SubCategory 40" },
    "image": "/uploads/category/40.png",
    "categoryId": 10
  }
]
const fullData = data.map((item) => {
    const category = categories.find(cat => cat.id === item.categoryId);
    if (!category) throw new Error(`❌ Category with ID ${item.categoryId} not found.`);
    return {
      ...item,
      category,
    };
  });

  await repo.query(`TRUNCATE "sub_category" RESTART IDENTITY CASCADE`);
  await repo.save(fullData);
};



async function runSeeder() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: 'aws-0-eu-central-1.pooler.supabase.com',
    port: 5432,
    username: 'postgres.sghvszzxubiyocwhfczj',
    password: 'ahmedshtya-083',
    database: 'rent-project',
    entities: [Setting , User , Address , Banner , Cart , CartItem , Complaint , Coupon , Domain , DomainConfiguration , Faq , Favorite , Order , Payment , Rating , Service , SubCategory , Category , LoyaltyReward , LoyaltyRule  , UserLoyaltyPoints  , UserRewardClaim  ],
    synchronize: true,
    logging: true,
  });

  try {
    await dataSource.initialize();
    // await seedSettings(dataSource);
    // await seedUsers(dataSource);
    // await seedCategory(dataSource);
    await seedSubCategory(dataSource);




    console.log('✅ Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await dataSource.destroy();
  }
}

runSeeder();
