import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const password = "password";
const hashedPassword = await bcrypt.hash(password, 10);

async function main() {
  // Roles
  const roles = await prisma.role.createMany({
    data: [
      { role_name: "ADMIN" },
      { role_name: "VENDOR" },
      { role_name: "USER" },
    ],
  });

  // Users
  const users = await prisma.user.createMany({
    data: [
      {
        first_name: "Admin",
        last_name: "Fitness",
        name: "Admin Fitness",
        email: "admin@akg7547.uta.cloud",
        dob: new Date("1990-01-01"),
        gender: "Male",
        password_hash: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
        role_id: 1,
        status: "ACTIVE",
        profilePic:
          "https://res.cloudinary.com/dxckq9hel/image/upload/v1744724688/lg8ybwc2d5gnqyfdmack.jpg",
      },
      {
        first_name: "Vendor",
        last_name: "Fitness",
        name: "Vendor Fitness",
        email: "vendor@akg7547.uta.cloud",
        dob: new Date("1985-02-02"),
        gender: "Male",
        password_hash: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
        role_id: 2,
        status: "ACTIVE",
        profilePic:
          "https://res.cloudinary.com/dxckq9hel/image/upload/v1744722244/jz2s06zdovqsiqhtqmtb.png",
      },
      {
        first_name: "User",
        last_name: "Fitness",
        name: "User Fitness",
        email: "user@akg7547.uta.cloud",
        dob: new Date("1992-03-03"),
        gender: "Other",
        password_hash: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
        role_id: 3,
        status: "ACTIVE",
        profilePic:
          "https://res.cloudinary.com/dxckq9hel/image/upload/v1744707119/hyxqk7qyctf2pr7ufpcr.png",
      },
    ],
  });

  // Permissions
  const permissions = await prisma.permission.createMany({
    data: [
      { role_id: 1, permission: "CREATE_USER" },
      { role_id: 1, permission: "DELETE_USER" },
      { role_id: 1, permission: "MODIFY_USER" },
      { role_id: 1, permission: "VIEW_USERS" },
      { role_id: 1, permission: "VIEW_ORDERS" },
      { role_id: 1, permission: "CREATE_ORDER" },
      { role_id: 1, permission: "DELETE_ORDER" },
      { role_id: 1, permission: "MODIFY_ORDER" },
      { role_id: 1, permission: "VIEW_PRODUCTS" },
      { role_id: 1, permission: "CREATE_PRODUCT" },
      { role_id: 1, permission: "DELETE_PRODUCT" },
      { role_id: 1, permission: "MODIFY_PRODUCT" },
      { role_id: 1, permission: "VIEW_FOOD_ITEMS" },
      { role_id: 1, permission: "CREATE_FOOD_ITEM" },
      { role_id: 1, permission: "DELETE_FOOD_ITEM" },
      { role_id: 1, permission: "MODIFY_FOOD_ITEM" },
      { role_id: 1, permission: "VIEW_DIET_PLAN" },
      { role_id: 1, permission: "CREATE_DIET_PLAN" },
      { role_id: 1, permission: "DELETE_DIET_PLAN" },
      { role_id: 1, permission: "MODIFY_DIET_PLAN" },
      { role_id: 1, permission: "VIEW_DIET_ITEMS" },
      { role_id: 1, permission: "CREATE_DIET_ITEM" },
      { role_id: 1, permission: "DELETE_DIET_ITEM" },
      { role_id: 1, permission: "MODIFY_DIET_ITEM" },
      { role_id: 1, permission: "VIEW_DIET_LOG" },
      { role_id: 1, permission: "CREATE_DIET_LOG" },
      { role_id: 1, permission: "DELETE_DIET_LOG" },
      { role_id: 1, permission: "MODIFY_DIET_LOG" },
      { role_id: 1, permission: "VIEW_ACTIVITY" },
      { role_id: 1, permission: "CREATE_ACTIVITY" },
      { role_id: 1, permission: "DELETE_ACTIVITY" },
      { role_id: 1, permission: "MODIFY_ACTIVITY" },
      { role_id: 1, permission: "VIEW_WORKOUT_PLAN" },
      { role_id: 1, permission: "CREATE_WORKOUT_PLAN" },
      { role_id: 1, permission: "DELETE_WORKOUT_PLAN" },
      { role_id: 1, permission: "MODIFY_WORKOUT_PLAN" },
      { role_id: 1, permission: "VIEW_WORKOUT_ITEMS" },
      { role_id: 1, permission: "CREATE_WORKOUT_ITEM" },
      { role_id: 1, permission: "DELETE_WORKOUT_ITEM" },
      { role_id: 1, permission: "MODIFY_WORKOUT_ITEM" },
      { role_id: 1, permission: "VIEW_WORKOUT_LOG" },
      { role_id: 1, permission: "CREATE_WORKOUT_LOG" },
      { role_id: 1, permission: "DELETE_WORKOUT_LOG" },
      { role_id: 1, permission: "MODIFY_WORKOUT_LOG" },
      { role_id: 1, permission: "VIEW_DASHBOARD_STATS" },
      { role_id: 1, permission: "VIEW_WORKOUT_STATS" },
      { role_id: 1, permission: "SEND_MESSAGE" },
      { role_id: 1, permission: "GET_MESSAGE" },
      { role_id: 1, permission: "UPDATE_PROFILE" },
      { role_id: 2, permission: "VIEW_ORDERS" },
      { role_id: 2, permission: "CREATE_ORDER" },
      { role_id: 2, permission: "DELETE_ORDER" },
      { role_id: 2, permission: "MODIFY_ORDER" },
      { role_id: 2, permission: "VIEW_PRODUCTS" },
      { role_id: 2, permission: "CREATE_PRODUCT" },
      { role_id: 2, permission: "DELETE_PRODUCT" },
      { role_id: 2, permission: "MODIFY_PRODUCT" },
      { role_id: 2, permission: "VIEW_DIET_PLAN" },
      { role_id: 2, permission: "CREATE_DIET_PLAN" },
      { role_id: 2, permission: "VIEW_FOOD_ITEMS" },
      { role_id: 2, permission: "CREATE_FOOD_ITEM" },
      { role_id: 2, permission: "VIEW_WORKOUT_PLAN" },
      { role_id: 2, permission: "CREATE_WORKOUT_PLAN" },
      { role_id: 2, permission: "VIEW_DIET_ITEMS" },
      { role_id: 2, permission: "MODIFY_DIET_ITEM" },
      { role_id: 2, permission: "VIEW_WORKOUT_ITEMS" },
      { role_id: 2, permission: "MODIFY_WORKOUT_ITEM" },
      { role_id: 2, permission: "VIEW_ACTIVITY" },
      { role_id: 2, permission: "CREATE_ACTIVITY" },
      { role_id: 2, permission: "VIEW_DIET_LOG" },
      { role_id: 2, permission: "CREATE_DIET_LOG" },
      { role_id: 2, permission: "DELETE_DIET_LOG" },
      { role_id: 2, permission: "MODIFY_DIET_LOG" },
      { role_id: 2, permission: "VIEW_WORKOUT_LOG" },
      { role_id: 2, permission: "CREATE_WORKOUT_LOG" },
      { role_id: 2, permission: "DELETE_WORKOUT_LOG" },
      { role_id: 2, permission: "MODIFY_WORKOUT_LOG" },
      { role_id: 2, permission: "VIEW_DASHBOARD_STATS" },
      { role_id: 2, permission: "VIEW_WORKOUT_STATS" },
      { role_id: 2, permission: "SEND_MESSAGE" },
      { role_id: 2, permission: "GET_MESSAGE" },
      { role_id: 2, permission: "UPDATE_PROFILE" },
      { role_id: 3, permission: "VIEW_FOOD_ITEMS" },
      { role_id: 3, permission: "CREATE_FOOD_ITEM" },
      { role_id: 3, permission: "VIEW_DIET_PLAN" },
      { role_id: 3, permission: "CREATE_DIET_PLAN" },
      { role_id: 3, permission: "VIEW_DIET_ITEMS" },
      { role_id: 3, permission: "MODIFY_DIET_ITEM" },
      { role_id: 3, permission: "VIEW_WORKOUT_PLAN" },
      { role_id: 3, permission: "CREATE_WORKOUT_PLAN" },
      { role_id: 3, permission: "VIEW_WORKOUT_ITEMS" },
      { role_id: 3, permission: "MODIFY_WORKOUT_ITEM" },
      { role_id: 3, permission: "VIEW_ACTIVITY" },
      { role_id: 3, permission: "CREATE_ACTIVITY" },
      { role_id: 3, permission: "VIEW_DIET_LOG" },
      { role_id: 3, permission: "CREATE_DIET_LOG" },
      { role_id: 3, permission: "DELETE_DIET_LOG" },
      { role_id: 3, permission: "MODIFY_DIET_LOG" },
      { role_id: 3, permission: "VIEW_WORKOUT_LOG" },
      { role_id: 3, permission: "CREATE_WORKOUT_LOG" },
      { role_id: 3, permission: "DELETE_WORKOUT_LOG" },
      { role_id: 3, permission: "MODIFY_WORKOUT_LOG" },
      { role_id: 3, permission: "VIEW_DASHBOARD_STATS" },
      { role_id: 3, permission: "VIEW_WORKOUT_STATS" },
      { role_id: 3, permission: "SEND_MESSAGE" },
      { role_id: 3, permission: "GET_MESSAGE" },
      { role_id: 3, permission: "UPDATE_PROFILE" },
    ],
  });

  // UserProfiles
  const userProfiles = await prisma.userProfile.createMany({
    data: [
      {
        user_id: 1,
        height: 160,
        weight: 60,
        blood_group: "A_POSITIVE",
        activity_type: "MODERATE",
        goal: "MAINTAIN",
        phone: "123-456-7890",
        address: "123 Main St, Anytown, USA",
      },
      {
        user_id: 2,
        height: 170,
        weight: 70,
        blood_group: "B_POSITIVE",
        activity_type: "ACTIVE",
        goal: "GAIN",
        phone: "456-789-1234",
        address: "456 Elm St, Anytown, USA",
      },
      {
        user_id: 3,
        height: 180,
        weight: 80,
        blood_group: "O_POSITIVE",
        activity_type: "LAZY",
        goal: "LOSE",
        phone: "789-123-4567",
        address: "789 Oak St, Anytown, USA",
      },
    ],
  });

  // Activities
  const activities = await prisma.activity.createMany({
    data: [
      {
        name: "Running",
        duration: 60, // in min
        calories_per_kg: 8, // Calories burned per kg per hour
      },
      {
        name: "Swimming",
        duration: 60, // in min
        calories_per_kg: 7.5, // Calories burned per kg per hour
      },
      {
        name: "Cycling",
        duration: 60, // in min
        calories_per_kg: 6.5, // Calories burned per kg per hour
      },
      {
        name: "Yoga",
        duration: 60, // in min
        calories_per_kg: 3, // Calories burned per kg per hour
      },
      {
        name: "Weightlifting",
        duration: 60, // in min
        calories_per_kg: 6, // Calories burned per kg per hour
      },
    ],
  });

  // WorkoutPlans
  const workoutPlans = await prisma.workoutPlan.createMany({
    data: [
      {
        user_id: 1,
        date: new Date("2025-03-01"),
        created_at: new Date(),
      },
      {
        user_id: 2,
        date: new Date("2025-04-01"),
        created_at: new Date(),
      },
    ],
  });

  // WorkoutPlanItems
  const workoutPlanItems = await prisma.workoutPlanItem.createMany({
    data: [
      {
        workout_plan_id: 1,
        activity_id: 1,
        duration: 60, //in min
        user_id: 1,
        plan_type: "USER",
        date: new Date(),
        created_by_id: 1,
        status: "PENDING",
      },
      {
        workout_plan_id: 1,
        activity_id: 2,
        duration: 30, //in min
        user_id: 1,
        plan_type: "AI",
        date: new Date(),
        created_by_id: 1,
        status: "PENDING",
      },
      {
        workout_plan_id: 1,
        activity_id: 3,
        duration: 30, //in min
        user_id: 1,
        plan_type: "USER",
        date: new Date(),
        created_by_id: 1,
        status: "PENDING",
      },
      {
        workout_plan_id: 2,
        activity_id: 4,
        duration: 15, //in min
        user_id: 1,
        plan_type: "USER",
        date: new Date(),
        created_by_id: 1,
        status: "PENDING",
      },
      {
        workout_plan_id: 2,
        activity_id: 5,
        duration: 20, //in min
        user_id: 1,
        plan_type: "USER",
        date: new Date(),
        created_by_id: 1,
        status: "PENDING",
      },
      {
        workout_plan_id: 2,
        activity_id: 1,
        duration: 10, //in min
        user_id: 1,
        plan_type: "USER",
        date: new Date(),
        created_by_id: 1,
        status: "PENDING",
      },
    ],
  });

  // WorkoutLogs

  // FoodCatalogue
  const foodCatalogue = await prisma.foodCatalogue.createMany({
    data: [
      {
        name: "Apple",
        calories: 95,
        carbs: 25,
        protein: 0.5,
        fats: 0.3,
        serving_size_gm: 100,
      },
      {
        name: "Banana",
        calories: 105,
        carbs: 27,
        protein: 1.3,
        fats: 0.4,
        serving_size_gm: 100,
      },
      {
        name: "Orange",
        calories: 62,
        carbs: 15,
        protein: 1.2,
        fats: 0.2,
        serving_size_gm: 100,
      },
      {
        name: "Milk",
        calories: 42,
        carbs: 5,
        protein: 3.4,
        fats: 1.2,
        serving_size_gm: 100,
      },
      {
        name: "Eggs",
        calories: 155,
        carbs: 1.1,
        protein: 12.6,
        fats: 10.6,
        serving_size_gm: 100,
      },
      {
        name: "Bread",
        calories: 265,
        carbs: 49,
        protein: 9,
        fats: 3.3,
        serving_size_gm: 100,
      },
      {
        name: "Butter",
        calories: 717,
        carbs: 0.1,
        protein: 0.9,
        fats: 81.1,
        serving_size_gm: 100,
      },
      {
        name: "Cheese",
        calories: 402,
        carbs: 3.1,
        protein: 25,
        fats: 33,
        serving_size_gm: 100,
      },
      {
        name: "Yogurt",
        calories: 59,
        carbs: 4.7,
        protein: 10,
        fats: 0.4,
        serving_size_gm: 100,
      },
      {
        name: "Chicken Breast",
        calories: 165,
        carbs: 0,
        protein: 31,
        fats: 3.6,
        serving_size_gm: 100,
      },
      {
        name: "Rice",
        calories: 205,
        carbs: 45,
        protein: 4.3,
        fats: 0.4,
        serving_size_gm: 100,
      },
      {
        name: "Broccoli",
        calories: 55,
        carbs: 11,
        protein: 3.7,
        fats: 0.7,
        serving_size_gm: 100,
      },
    ],
  });

  // DietPlans
  const dietPlans = await prisma.dietPlan.createMany({
    data: [
      {
        user_id: 1,
        date: new Date("2023-01-01"),
      },
      {
        user_id: 2,
        date: new Date("2023-02-01"),
      },
      {
        user_id: 3,
        date: new Date("2023-03-01"),
      },
    ],
  });

  // DietPlanItems
  const dietPlanItems = await prisma.dietPlanItem.createMany({
    data: [
      {
        diet_plan_id: 1,
        meal_type: "BREAKFAST",
        food_id: 1,
        quantity: 1,
        user_id: 1,
        plan_type: "USER",
        date: new Date(),
        created_by_id: 1,
        status: "PENDING",
      },
      {
        diet_plan_id: 1,
        meal_type: "LUNCH",
        food_id: 2,
        quantity: 1,
        user_id: 1,
        plan_type: "USER",
        date: new Date(),
        created_by_id: 1,
        status: "PENDING",
      },
      {
        diet_plan_id: 1,
        meal_type: "DINNER",
        food_id: 3,
        quantity: 200,
        user_id: 1,
        plan_type: "USER",
        date: new Date(),
        created_by_id: 1,
        status: "PENDING",
      },
      {
        diet_plan_id: 1,
        meal_type: "SNACK",
        food_id: 4,
        quantity: 150,
        user_id: 1,
        plan_type: "USER",
        date: new Date(),
        created_by_id: 1,
        status: "PENDING",
      },
      {
        diet_plan_id: 2,
        meal_type: "BREAKFAST",
        food_id: 5,
        quantity: 100,
        user_id: 1,
        plan_type: "USER",
        date: new Date(),
        created_by_id: 1,
        status: "PENDING",
      },
      {
        diet_plan_id: 2,
        meal_type: "LUNCH",
        food_id: 6,
        quantity: 1,
        user_id: 1,
        plan_type: "USER",
        date: new Date(),
        created_by_id: 1,
        status: "PENDING",
      },
      {
        diet_plan_id: 2,
        meal_type: "DINNER",
        food_id: 7,
        quantity: 10,
        user_id: 1,
        plan_type: "USER",
        date: new Date(),
        created_by_id: 1,
        status: "PENDING",
      },
      {
        diet_plan_id: 2,
        meal_type: "SNACK",
        food_id: 8,
        quantity: 50,
        user_id: 1,
        plan_type: "USER",
        date: new Date(),
        created_by_id: 1,
        status: "PENDING",
      },
      {
        diet_plan_id: 3,
        meal_type: "BREAKFAST",
        food_id: 9,
        quantity: 200,
        user_id: 1,
        plan_type: "USER",
        date: new Date(),
        created_by_id: 1,
        status: "PENDING",
      },
      {
        diet_plan_id: 3,
        meal_type: "LUNCH",
        food_id: 10,
        quantity: 150,
        user_id: 1,
        plan_type: "USER",
        date: new Date(),
        created_by_id: 1,
        status: "PENDING",
      },
      {
        diet_plan_id: 3,
        meal_type: "DINNER",
        food_id: 11,
        quantity: 100,
        user_id: 1,
        plan_type: "USER",
        date: new Date(),
        created_by_id: 1,
        status: "PENDING",
      },
      {
        diet_plan_id: 3,
        meal_type: "SNACK",
        food_id: 12,
        quantity: 50,
        user_id: 1,
        plan_type: "USER",
        date: new Date(),
        created_by_id: 1,
        status: "PENDING",
      },
    ],
  });

  // AiRecommendations
  const aiRecommendations = await prisma.aiRecommendation.createMany({
    data: [
      { user_id: 1, type: "DIET", plan_id: 1 },
      { user_id: 2, type: "WORKOUT", plan_id: 2 },
      { user_id: 3, type: "DIET", plan_id: 3 },
    ],
  });

  // DailyProgress
  const dailyProgress = await prisma.dailyProgress.createMany({
    data: [
      {
        user_id: 1,
        date: new Date("2023-01-01"),
        calories_intake: 2000,
        calories_burned: 300,
        protein_intake: 100,
        carbs_intake: 250,
        fats_intake: 50,
        steps_count: 10000,
        water_intake: 2,
      },
      {
        user_id: 2,
        date: new Date("2023-02-01"),
        calories_intake: 2200,
        calories_burned: 400,
        protein_intake: 120,
        carbs_intake: 270,
        fats_intake: 60,
        steps_count: 12000,
        water_intake: 2.5,
      },
      {
        user_id: 3,
        date: new Date("2023-03-01"),
        calories_intake: 1800,
        calories_burned: 200,
        protein_intake: 80,
        carbs_intake: 200,
        fats_intake: 40,
        steps_count: 8000,
        water_intake: 1.5,
      },
    ],
  });

  // Messages
  const messages = await prisma.message.createMany({
    data: [
      { sender_id: 1, receiver_id: 2, content: "Hello Vendor!" },
      { sender_id: 2, receiver_id: 1, content: "Hi Admin!" },
      { sender_id: 1, receiver_id: 2, content: "How are you?" },
      { sender_id: 2, receiver_id: 1, content: "I'm good, thanks!" },
      { sender_id: 1, receiver_id: 2, content: "What's up?" },
      { sender_id: 2, receiver_id: 3, content: "Hi User!" },
      { sender_id: 3, receiver_id: 2, content: "Hello Vendor!" },
      { sender_id: 2, receiver_id: 3, content: "How's it going?" },
      { sender_id: 3, receiver_id: 2, content: "Not bad, you?" },
      { sender_id: 2, receiver_id: 3, content: "Doing well, thanks!" },
    ],
  });

  // Notifications
  const notifications = await prisma.notification.createMany({
    data: [
      { user_id: 1, message: "You have a new message from Bob." },
      { user_id: 2, message: "You have a new message from Charlie." },
      { user_id: 3, message: "You have a new message from David." },
    ],
  });

  // Products
  const products = await prisma.product.createMany({
    data: [
      {
        name: "Protein Powder",
        description: "High-quality protein powder",
        price: 50.0,
        stock: 100,
        user_id: 1,
        category: "Supplements",
        image_url:
          "https://assets.clevelandclinic.org/transform/5912d44c-c4c7-4ca3-bc65-c4597780a614/Brown-Rice-Protein-Powder-1062901980-770x533-1_jpg",
        status: "ACTIVE",
      },
      {
        name: "Running Shoes",
        description: "Comfortable running shoes",
        price: 100.0,
        stock: 50,
        user_id: 1,
        category: "Footwear",
        image_url:
          "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1741889693-asic-superblast-2-67d32026850eb.jpg?crop=0.803xw:0.803xh;0.109xw,0.0673xh&resize=980:*",
        status: "ACTIVE",
      },
      {
        name: "Yoga Mat",
        description: "Non-slip yoga mat",
        price: 30.0,
        stock: 200,
        user_id: 1,
        category: "Accessories",
        image_url:
          "https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/productimage/2021/1/13/94212adc-2e01-4dda-aea9-ea8c100c9c4e1610541465998-1.jpg",
        status: "ACTIVE",
      },
      {
        name: "Dumbbells",
        description: "Adjustable dumbbells",
        price: 80.0,
        stock: 30,
        user_id: 1,
        category: "Equipment",
        image_url: "https://m.media-amazon.com/images/I/61MwNosjgaL.jpg",
        status: "ACTIVE",
      },
      {
        name: "Fitness Tracker",
        description: "Advanced fitness tracker",
        price: 150.0,
        stock: 40,
        user_id: 1,
        category: "Electronics",
        image_url:
          "https://cdn.thewirecutter.com/wp-content/media/2023/11/fitness-tracker-2048px-5344.jpg?auto=webp&quality=75&crop=1.91:1&width=1200",
        status: "ACTIVE",
      },
      {
        name: "Resistance Bands",
        description: "High-quality resistance bands",
        price: 20.0,
        stock: 150,
        user_id: 1,
        category: "Equipment",
        image_url:
          "https://static.wixstatic.com/media/fe6cc3_db0bcb5a8fee4e81a583b2992e249a49~mv2.jpg/v1/fit/w_500,h_500,q_90/file.jpg",
        status: "ACTIVE",
      },
      {
        name: "Water Bottle",
        description: "Insulated water bottle",
        price: 15.0,
        stock: 300,
        user_id: 1,
        category: "Accessories",
        image_url:
          "https://b3504934.smushcdn.com/3504934/wp-content/uploads/2022/08/Most-Stylish-Water-Bottles-Portrait-2240x2800.jpg?lossy=2&strip=1&webp=1",
        status: "ACTIVE",
      },
    ],
  });

  // Orders
  const orders = await prisma.order.createMany({
    data: [
      { user_id: 1, total_price: 50.0 },
      { user_id: 2, total_price: 100.0 },
      { user_id: 3, total_price: 30.0 },
      { user_id: 1, total_price: 20.0 },
      { user_id: 2, total_price: 15.0 },
      { user_id: 3, total_price: 40.0 },
    ],
  });

  // OrderItems
  const orderItems = await prisma.orderItem.createMany({
    data: [
      { order_id: 1, product_id: 1, quantity: 1, price: 50.0 },
      { order_id: 2, product_id: 2, quantity: 1, price: 100.0 },
      { order_id: 3, product_id: 3, quantity: 1, price: 30.0 },
      { order_id: 4, product_id: 4, quantity: 1, price: 80.0 },
      { order_id: 5, product_id: 5, quantity: 1, price: 150.0 },
      { order_id: 6, product_id: 6, quantity: 1, price: 20.0 },
    ],
  });

  // Cart
  const cart = await prisma.cart.createMany({
    data: [
      { user_id: 1, product_id: 1, quantity: 1 },
      { user_id: 2, product_id: 2, quantity: 1 },
      { user_id: 3, product_id: 3, quantity: 1 },
      { user_id: 1, product_id: 6, quantity: 1 },
      { user_id: 2, product_id: 7, quantity: 1 },
    ],
  });

  // Wishlist
  const wishlist = await prisma.wishlist.createMany({
    data: [
      { user_id: 1, product_id: 1 },
      { user_id: 2, product_id: 2 },
      { user_id: 3, product_id: 3 },
      { user_id: 1, product_id: 6 },
      { user_id: 2, product_id: 7 },
    ],
  });

  // ContactUs
  const contactUs = await prisma.contactUs.createMany({
    data: [
      {
        name: "John Doe",
        email: "john@akg7547.uta.cloud",
        subject: "Inquiry",
        message: "I have a question.",
      },
      {
        name: "Jane Smith",
        email: "jane@akg7547.uta.cloud",
        subject: "Feedback",
        message: "Great service!",
      },
      {
        name: "Mike Johnson",
        email: "mike@akg7547.uta.cloud",
        subject: "Support",
        message: "Need help with my order.",
      },
      {
        name: "Emily Davis",
        email: "emily@akg7547.uta.cloud",
        subject: "Complaint",
        message: "Issue with delivery.",
      },
      {
        name: "Robert Brown",
        email: "robert@akg7547.uta.cloud",
        subject: "Suggestion",
        message: "Add more products.",
      },
    ],
  });

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
