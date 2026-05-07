import prisma from "../db/prismaClient.js";
import { z } from "zod";
import Groq from "groq-sdk";

export const createFoodCatalogueSchema = z.object({
  name: z.string().min(1, "Food name is required"),
  calories: z.number().min(1, "Calories must be a positive number"),
  carbs: z.number().min(0, "Carbs must be a positive number"),
  protein: z.number().min(0, "Protein must be a positive number"),
  fats: z.number().min(0, "Fats must be a positive number"),
  serving_size_gm: z.number().min(1, "Serving size must be a positive number"),
  user_id: z.number().optional(),
});

export const createFoodCatalogue = async (req, res) => {
  let body;
  try {
    body = await req.body;

    // Step 1: Validate body using Zod schema
    if (!body) {
      return res
        .status(400)
        .json({ message: "Request body is empty or malformed" });
    }

    const parsedBody = createFoodCatalogueSchema.parse(body); // Zod schema validation

    // Step 2: Check if Food already exists
    const foodExists = await prisma.foodCatalogue.findUnique({
      where: { name: parsedBody.name },
    });

    if (foodExists) {
      return res.status(400).json({
        success: false,
        message: "Food item with this name already exists",
      });
    }

    // Step 3: Create Food in the database
    const food = await prisma.foodCatalogue.create({
      data: {
        name: parsedBody.name,
        calories: parsedBody.calories,
        carbs: parsedBody.carbs,
        protein: parsedBody.protein,
        fats: parsedBody.fats,
        serving_size_gm: parsedBody.serving_size_gm,
        user_id: parsedBody.user_id || null,
      },
    });

    // Step 4: Return success response
    return res.status(201).json({
      success: true,
      message: "Food item created successfully",
      food,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
export const modifyFoodCatalogue = async (req, res) => {
  let body;
  const foodId = parseInt(req.params.foodId); // Get the food ID from the URL params

  try {
    body = await req.body;

    // Step 1: Validate body using Zod schema
    if (!body) {
      return res
        .status(400)
        .json({ message: "Request body is empty or malformed" });
    }

    const parsedBody = createFoodCatalogueSchema.parse(body); // Zod schema validation

    // Step 2: Check if Food exists by ID
    const foodExists = await prisma.foodCatalogue.findUnique({
      where: { id: foodId },
    });

    if (!foodExists) {
      return res.status(404).json({
        success: false,
        message: "Food item not found",
      });
    }

    // Step 3: Update the Food item in the database
    const updatedFood = await prisma.foodCatalogue.update({
      where: { id: foodId }, // Use the ID from the URL params to find the food item
      data: {
        name: parsedBody.name || foodExists.name,
        calories: parsedBody.calories || foodExists.calories,
        carbs: parsedBody.carbs || foodExists.carbs,
        protein: parsedBody.protein || foodExists.protein,
        fats: parsedBody.fats || foodExists.fats,
        serving_size_gm:
          parsedBody.serving_size_gm || foodExists.serving_size_gm,
        user_id: parsedBody.user_id || foodExists.user_id, // If no user_id, keep the existing one
      },
    });

    // Step 4: Return success response
    return res.status(200).json({
      success: true,
      message: "Food item updated successfully",
      food: updatedFood,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
export const deleteFoodCatalogue = async (req, res) => {
  const foodId = parseInt(req.params.foodId); // Get the food ID from the URL params

  try {
    // Step 1: Validate the ID (check if it's a valid number)
    if (isNaN(foodId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid food ID" });
    }

    // Step 2: Check if Food exists by ID
    const foodExists = await prisma.foodCatalogue.findUnique({
      where: { id: foodId },
    });

    if (!foodExists) {
      return res.status(404).json({
        success: false,
        message: "Food item not found",
      });
    }

    // Step 3: Delete the Food item from the database
    await prisma.foodCatalogue.delete({
      where: { id: foodId },
    });

    // Step 4: Return success response
    return res.status(200).json({
      success: true,
      message: "Food item deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
export const getAllFoodCatalogue = async (req, res) => {
  try {
    // Step 1: Fetch all food items from the database
    const foods = await prisma.foodCatalogue.findMany();

    // Step 2: Check if there are no food items
    if (foods.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No food items found",
      });
    }

    // Step 3: Return all food items
    return res.status(200).json({
      success: true,
      foods,
    });
  } catch (error) {
    // Step 4: Handle any errors
    return res.status(400).json({ success: false, message: error.message });
  }
};
export const getFoodCatalogueById = async (req, res) => {
  const foodId = parseInt(req.params.foodId); // Get the food ID from the URL params

  try {
    // Step 1: Fetch the food item from the database by ID
    const food = await prisma.foodCatalogue.findUnique({
      where: { id: foodId },
    });

    // Step 2: Check if the food item exists
    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food item not found",
      });
    }

    // Step 3: Return the food item
    return res.status(200).json({
      success: true,
      food,
    });
  } catch (error) {
    // Step 4: Handle any errors
    return res.status(400).json({ success: false, message: error.message });
  }
};
//diet plan items
const createDietPlanItemSchema = z.object({
  diet_plan_id: z.number().min(1, "Diet Plan ID is required"),
  meal_type: z.enum(
    ["BREAKFAST", "LUNCH", "DINNER", "SNACK"],
    "Invalid meal type"
  ),
  food_id: z.number().min(1, "Food ID is required"),
  status: z.enum(["PENDING", "COMPLETED", "SKIPPED"]).optional(),
  quantity: z.number().min(0.1, "Quantity must be greater than zero"),
  user_id: z.number().min(1, "User ID is required"), // Added user_id
  plan_type: z.enum(["AI", "USER"]).optional(), // Added plan_type
});

// export const createDietPlanItem = async (req, res) => {
//   const { body } = req;

//   try {
//     // Validate request body using Zod
//     const parsedBody = createDietPlanItemSchema.parse(body);
//     const date = await prisma.dietPlan.findFirst({
//       where: {
//         id: parsedBody.diet_plan_id,
//       },
//       select: {
//         date: true,
//       },
//     });

//     // Create new DietPlanItem
//     const dietPlanItem = await prisma.dietPlanItem.create({
//       data: {
//         diet_plan_id: parsedBody.diet_plan_id,
//         meal_type: parsedBody.meal_type,
//         food_id: parsedBody.food_id,
//         quantity: parsedBody.quantity,
//         user_id: parsedBody.user_id,
//         plan_type: parsedBody.plan_type || "USER", // Default to "USER" if not provided
//         date: date.date,
//         created_by_id: req.userId,
//       },
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Diet Plan Item created successfully",
//       dietPlanItem,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
export const createDietPlanItem = async (req, res) => {
  const { body } = req;

  try {
    // Validate request body using Zod
    const parsedBody = createDietPlanItemSchema.parse(body);

    // Check that the diet plan exists and belongs to the given user_id
    const dietPlan = await prisma.dietPlan.findFirst({
      where: {
        id: parsedBody.diet_plan_id,
        user_id: parsedBody.user_id,
      },
      select: {
        date: true,
      },
    });

    if (!dietPlan) {
      return res.status(403).json({
        success: false,
        message:
          "Diet Plan does not belong to the specified user or does not exist",
      });
    }

    // Create new DietPlanItem
    const dietPlanItem = await prisma.dietPlanItem.create({
      data: {
        diet_plan_id: parsedBody.diet_plan_id,
        status: parsedBody.status,
        meal_type: parsedBody.meal_type,
        food_id: parsedBody.food_id,
        quantity: parsedBody.quantity,
        user_id: parsedBody.user_id,
        plan_type: parsedBody.plan_type || "USER",
        date: dietPlan.date,
        created_by_id: req.userId,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Diet Plan Item created successfully",
      dietPlanItem,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateDietPlanItemSchema = z.object({
  meal_type: z.enum(["BREAKFAST", "LUNCH", "DINNER", "SNACK"]).optional(),
  food_id: z.number().min(1, "Food ID is required").optional(),
  quantity: z
    .number()
    .min(0.1, "Quantity must be greater than zero")
    .optional(),
  status: z.enum(["PENDING", "COMPLETED", "SKIPPED"]).optional(),
  user_id: z.number().min(1, "User ID is required").optional(),
  plan_type: z.enum(["AI", "USER"]).optional(),

  created_by_id: z.number().min(1, "Created By ID is required").optional(),
});

// export const updateDietPlanItem = async (req, res) => {
//   const { id } = req.params;
//   const { body } = req;
//   console.log(req.body.diet_plan_id);

//   try {
//     // Validate request body using Zod
//     const parsedBody = updateDietPlanItemSchema.parse(body);

//     // Find the DietPlanItem by ID
//     const dietPlanItem = await prisma.dietPlanItem.findUnique({
//       where: { id: parseInt(id) },
//     });

//     if (!dietPlanItem) {
//       return res.status(404).json({
//         success: false,
//         message: "Diet Plan Item not found",
//       });
//     }

//     // Update the DietPlanItem
//     const updatedDietPlanItem = await prisma.dietPlanItem.update({
//       where: { id: parseInt(id) },
//       data: {
//         meal_type: parsedBody.meal_type || dietPlanItem.meal_type,
//         food_id: parsedBody.food_id || dietPlanItem.food_id,
//         quantity: parsedBody.quantity || dietPlanItem.quantity,
//         status: parsedBody.status || dietPlanItem.status,
//         user_id: parsedBody.user_id || dietPlanItem.user_id,
//         plan_type: parsedBody.plan_type || dietPlanItem.plan_type,
//         date: dietPlanItem.date,
//         created_by_id: parsedBody.created_by_id || dietPlanItem.created_by_id,
//       },
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Diet Plan Item updated successfully",
//       dietPlanItem: updatedDietPlanItem,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
export const updateDietPlanItem = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const parsedBody = updateDietPlanItemSchema.parse(body);

    // Get the existing diet plan item
    const oldDietPlanItem = await prisma.dietPlanItem.findUnique({
      where: { id: parseInt(id) },
      include: { food: true },
    });

    if (!oldDietPlanItem) {
      return res.status(404).json({
        success: false,
        message: "Diet Plan Item not found",
      });
    }

    const food = oldDietPlanItem.food;

    // Calculate per gram macros
    const caloriesPerGram = food.calories / food.serving_size_gm;
    const proteinPerGram = food.protein / food.serving_size_gm;
    const carbsPerGram = food.carbs / food.serving_size_gm;
    const fatsPerGram = food.fats / food.serving_size_gm;

    // New quantity and macro values
    const newQuantity = parsedBody.quantity || oldDietPlanItem.quantity;
    const newCalories = caloriesPerGram * newQuantity;
    const newProtein = proteinPerGram * newQuantity;
    const newCarbs = carbsPerGram * newQuantity;
    const newFats = fatsPerGram * newQuantity;

    // Old values (if completed)
    let oldCalories = 0,
      oldProtein = 0,
      oldCarbs = 0,
      oldFats = 0;

    if (oldDietPlanItem.status === "COMPLETED") {
      oldCalories = caloriesPerGram * oldDietPlanItem.quantity;
      oldProtein = proteinPerGram * oldDietPlanItem.quantity;
      oldCarbs = carbsPerGram * oldDietPlanItem.quantity;
      oldFats = fatsPerGram * oldDietPlanItem.quantity;
    }

    // Update or create daily progress
    let dailyProgress = await prisma.dailyProgress.findUnique({
      where: {
        user_id_date: {
          user_id: parsedBody.user_id,
          date: oldDietPlanItem.date.toISOString(),
        },
      },
    });

    if (!dailyProgress) {
      dailyProgress = await prisma.dailyProgress.create({
        data: {
          user_id: parsedBody.user_id,
          date: oldDietPlanItem.date.toISOString(),
          calories_intake: parsedBody.status === "COMPLETED" ? newCalories : 0,
          protein_intake: parsedBody.status === "COMPLETED" ? newProtein : 0,
          carbs_intake: parsedBody.status === "COMPLETED" ? newCarbs : 0,
          fats_intake: parsedBody.status === "COMPLETED" ? newFats : 0,
        },
      });
    } else {
      let caloriesDiff = 0,
        proteinDiff = 0,
        carbsDiff = 0,
        fatsDiff = 0;

      if (parsedBody.status === "COMPLETED") {
        if (oldDietPlanItem.status === "COMPLETED") {
          caloriesDiff = newCalories - oldCalories;
          proteinDiff = newProtein - oldProtein;
          carbsDiff = newCarbs - oldCarbs;
          fatsDiff = newFats - oldFats;
        } else {
          caloriesDiff = newCalories;
          proteinDiff = newProtein;
          carbsDiff = newCarbs;
          fatsDiff = newFats;
        }
      } else if (
        parsedBody.status === "PENDING" &&
        oldDietPlanItem.status === "COMPLETED"
      ) {
        caloriesDiff = -oldCalories;
        proteinDiff = -oldProtein;
        carbsDiff = -oldCarbs;
        fatsDiff = -oldFats;
      }

      await prisma.dailyProgress.update({
        where: {
          user_id_date: {
            user_id: parsedBody.user_id,
            date: oldDietPlanItem.date.toISOString(),
          },
        },
        data: {
          calories_intake: { increment: caloriesDiff },
          protein_intake: { increment: proteinDiff },
          carbs_intake: { increment: carbsDiff },
          fats_intake: { increment: fatsDiff },
        },
      });
    }

    // Update the diet plan item
    const updatedDietPlanItem = await prisma.dietPlanItem.update({
      where: { id: parseInt(id) },
      data: {
        meal_type: parsedBody.meal_type || oldDietPlanItem.meal_type,
        food_id: parsedBody.food_id || oldDietPlanItem.food_id,
        quantity: newQuantity,
        status: parsedBody.status || oldDietPlanItem.status,
        user_id: parsedBody.user_id || oldDietPlanItem.user_id,
        plan_type: parsedBody.plan_type || oldDietPlanItem.plan_type,
        date: oldDietPlanItem.date,
        created_by_id:
          parsedBody.created_by_id || oldDietPlanItem.created_by_id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Diet Plan Item updated successfully",
      dietPlanItem: updatedDietPlanItem,
    });
  } catch (error) {
    console.error("Update Diet Plan Item Error:", error);
    return res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

// export const deleteDietPlanItem = async (req, res) => {
//   const { id } = req.params;

//   try {
//     // Find the DietPlanItem by ID
//     const dietPlanItem = await prisma.dietPlanItem.findUnique({
//       where: { id: parseInt(id) },
//     });

//     if (!dietPlanItem) {
//       return res.status(404).json({
//         success: false,
//         message: "Diet Plan Item not found",
//       });
//     }

//     // Delete the DietPlanItem
//     await prisma.dietPlanItem.delete({
//       where: { id: parseInt(id) },
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Diet Plan Item deleted successfully",
//     });
//   } catch (error) {
//     return res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
export const deleteDietPlanItem = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the DietPlanItem by ID and include the food data
    const dietPlanItem = await prisma.dietPlanItem.findUnique({
      where: { id: parseInt(id) },
      include: { food: true }, // Ensure that food data is included
    });

    if (!dietPlanItem) {
      return res.status(404).json({
        success: false,
        message: "Diet Plan Item not found",
      });
    }

    // Check if the Diet Plan Item has a status of "COMPLETED"
    if (dietPlanItem.status === "COMPLETED") {
      // If it's completed, we need to adjust the daily progress
      const dailyProgress = await prisma.dailyProgress.findUnique({
        where: {
          user_id_date: {
            user_id: dietPlanItem.user_id,
            date: dietPlanItem.date.toISOString(), // Assuming the date is stored and needs adjustment based on the date
          },
        },
      });

      if (dailyProgress) {
        // Check if the food data exists and is valid before calculating
        if (!dietPlanItem.food) {
          return res.status(400).json({
            success: false,
            message: "Food data not found for the Diet Plan Item",
          });
        }

        // Calculate consumed values based on quantity and food data
        const caloriesPerGram =
          dietPlanItem.food.calories / dietPlanItem.food.serving_size_gm;
        const proteinPerGram =
          dietPlanItem.food.protein / dietPlanItem.food.serving_size_gm;
        const carbsPerGram =
          dietPlanItem.food.carbs / dietPlanItem.food.serving_size_gm;
        const fatsPerGram =
          dietPlanItem.food.fats / dietPlanItem.food.serving_size_gm;

        const caloriesConsumed = caloriesPerGram * dietPlanItem.quantity;
        const proteinConsumed = proteinPerGram * dietPlanItem.quantity;
        const carbsConsumed = carbsPerGram * dietPlanItem.quantity;
        const fatsConsumed = fatsPerGram * dietPlanItem.quantity;

        // Update the daily progress by subtracting the values
        await prisma.dailyProgress.update({
          where: {
            user_id_date: {
              user_id: dietPlanItem.user_id,
              date: dietPlanItem.date.toISOString(),
            },
          },
          data: {
            calories_intake: { decrement: caloriesConsumed },
            protein_intake: { decrement: proteinConsumed },
            carbs_intake: { decrement: carbsConsumed },
            fats_intake: { decrement: fatsConsumed },
          },
        });
      }
    }

    // Delete the DietPlanItem
    await prisma.dietPlanItem.delete({
      where: { id: parseInt(id) },
    });

    return res.status(200).json({
      success: true,
      message: "Diet Plan Item deleted successfully",
    });
  } catch (error) {
    console.error("Delete Diet Plan Item Error:", error);
    return res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const viewDietPlanItem = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the DietPlanItem by ID and include related data (food details)
    const dietPlanItem = await prisma.dietPlanItem.findUnique({
      where: { id: parseInt(id) },
      include: {
        food: true, // Include related food details
        diet_plan: true, // Include related diet plan details
      },
    });

    if (!dietPlanItem) {
      return res.status(404).json({
        success: false,
        message: "Diet Plan Item not found",
      });
    }

    return res.status(200).json({
      success: true,
      dietPlanItem,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllDietPlanItems = async (req, res) => {
  try {
    const rawItems = await prisma.dietPlanItem.findMany({
      select: {
        id: true,
        diet_plan_id: true,
        meal_type: true,
        status: true,
        created_by_id: true,
        plan_type: true,
        quantity: true,
        food_id: true,
        user_id: true,
        user: {
          select: {
            name: true,
          },
        },
        food: {
          select: {
            name: true,
          },
        },
      },
    });

    // Flatten the food name to top-level
    const dietPlanItems = rawItems.map((item) => ({
      id: item.id,
      diet_plan_id: item.diet_plan_id,
      meal_type: item.meal_type,
      status: item.status,
      created_by_id: item.created_by_id,
      plan_type: item.plan_type,
      quantity: item.quantity,
      food_id: item.food_id,
      food_name: item.food.name,
      user_id: item.user_id,
      user_name: item.user.name,
    }));

    return res.status(200).json({
      success: true,
      dietPlanItems,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const fetchSuggestedDietPlan = async (req, res) => {
  console.log("✅ fetchSuggestedDietPlan triggered");
  try {
    console.log("📥 Fetching food items from DB");
    const food_items = await prisma.foodCatalogue.findMany();

    console.log("🔄 Getting or creating diet plan for user:", req.userId);
    let diet_planId = await getOrCreateDietPlan(req.userId);
    console.log("📘 Raw diet_planId:", diet_planId);
    diet_planId = diet_planId.planId;
    console.log("✅ Final diet_planId:", diet_planId);

    console.log("⚙️ Calculating calories for user:", req.userId);
    const calories = await calculateCalories(req.userId);
    console.log("🔥 Calories response:", calories);

    if (!calories.success) {
      console.log("❌ Calories calculation failed:", calories.message);
      return res.status(400).json({
        success: false,
        message: calories.message,
      });
    }

    const goal = calories.goal;
    const calories_intake = calories.dailyCalories;
    const calories_burned = calories.caloriesToBurn;

    console.log("🎯 Goal:", goal);
    console.log("📊 Calories to intake:", calories_intake);
    console.log("🔥 Calories already burned:", calories_burned);

    console.log("📦 Fetching existing diet plan items");
    const planItems = await getDietPlanItems(req.userId, diet_planId);
    console.log("📦 Plan items found:", planItems.length);

    console.log("🧩 Formatting food items");
    const formattedFoodItems = food_items.map((item) => ({
      id: item.id,
      name: item.name,
      calories: item.calories,
    }));
    console.log("📋 Formatted Food Items:", formattedFoodItems);

    console.log("🤖 Creating OpenAI client");
    const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

    console.log("📝 Constructing prompt input");
    const instructions = `
You are a strict API that ONLY returns valid JSON with no extra text.
Return a JSON object with exactly one key: "diet_plan".
The value should be an object with keys BREAKFAST, LUNCH, DINNER, SNACK — each with the required fields.
You MUST NOT return markdown (like \`\`\`) or any commentary.
Only use items from the catalogue.
Never repeat food_id.
Ensure total calories match the target.
`;

    const input = `
User Details:
- user_id: ${req.userId}
- diet_plan_id: ${diet_planId}
- goal: ${goal}
- calories_to_intake: ${calories_intake}
- calories_burned: ${calories_burned}
- weight: ${calories.weight}
- existing_plan_items: ${JSON.stringify(planItems)}

Available Food Items:
${JSON.stringify(formattedFoodItems)}

Output Format:
{
  "diet_plan": {
    "BREAKFAST": {
      "diet_plan_id": ${diet_planId},
      "meal_type": "BREAKFAST",
      "food_id": 1,
      "quantity": 100,
      "user_id": ${req.userId},
      "plan_type": "AI",
      "date": "${new Date().toISOString()}",
      "created_by_id": ${req.userId},
      "status": "PENDING"
    },
    ...
  }
}`;

    console.log("📤 Sending request to OpenAI");
    const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
    { role: "system", content: instructions },
    { role: "user", content: input }
  ],
});
    const outputText = response.choices[0].message.content;
    console.log("📄 Raw OpenAI response:", outputText);

    const jsonStart = outputText.indexOf("{");
    const jsonEnd = outputText.lastIndexOf("}") + 1;
    const cleanedResponse = outputText.slice(jsonStart, jsonEnd);

    console.log("🧾 Extracted JSON section:", cleanedResponse);

    let dietPlan;
    try {
      dietPlan = JSON.parse(cleanedResponse);
      console.log("✅ Parsed diet plan:", dietPlan);
    } catch (err) {
      console.error("❌ Failed to parse JSON:", err.message);
      return res.status(400).json({
        success: false,
        message: "AI returned invalid JSON. Try again later.",
      });
    }

    console.log("🛠️ Creating multiple diet plan items from AI suggestion");
    await createMultipleDietPlanItemsHelper(dietPlan, diet_planId, req.userId);

    console.log("✅ Diet plan items created successfully");
    return res.status(200).json({
      success: true,
      suggestedDietPlan: dietPlan,
    });
  } catch (error) {
    console.error("❌ Error in fetchSuggestedDietPlan:", error.message);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


export const getOrCreateDietPlan = async (userId) => {
  try {
    // Get the current date and time in UTC
    const now = new Date();

    // Calculate the offset for Arlington time (UTC-5 or UTC-4 depending on DST)
    // Arlington follows US Eastern Time
    const date = new Date();
    const isEDT = /\(EDT\)/.test(date.toString()); // Check if EDT (Daylight Saving Time)
    const arlingtonOffset = isEDT ? -4 * 60 * 60 * 1000 : -5 * 60 * 60 * 1000; // -4 or -5 hours in milliseconds

    // Construct the current day in Arlington time (midnight Arlington time)
    const arlingtonToday = new Date(now.getTime() + arlingtonOffset);
    arlingtonToday.setUTCHours(0, 0, 0, 0);

    // Calculate the end of the day in Arlington time (23:59:59.999)
    const endOfDay = new Date(arlingtonToday);
    endOfDay.setUTCHours(23, 59, 59, 999);

    // Convert both dates to ISO string format to ensure Arlington time handling
    const todayISOString = arlingtonToday.toISOString();
    const endOfDayISOString = endOfDay.toISOString();

    // Check if there's an existing plan for the user today (in Arlington time)
    const existingPlan = await prisma.dietPlan.findFirst({
      where: {
        user_id: userId,
        date: {
          gte: todayISOString, // Greater than or equal to the start of today in Arlington time
          lt: endOfDayISOString, // Less than the start of the next day in Arlington time
        },
      },
    });

    // If the plan already exists for today, return the plan ID
    if (existingPlan) {
      return { planId: existingPlan.id };
    }

    // If no plan exists, create a new diet plan for the user
    const newPlan = await prisma.dietPlan.create({
      data: {
        user_id: userId,
        date: todayISOString, // Set date to the Arlington start of the day
      },
    });

    // Return the new plan ID
    return { planId: newPlan.id };
  } catch (error) {
    console.error("Error fetching or creating diet plan:", error);
    throw new Error("Something went wrong while handling the diet plan.");
  }
};

export const calculateCalories = async (userId) => {
  try {
    // Extract the user profile and user data from the database using the userId
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        UserProfile: true, // Include the userProfile related data
      },
    });

    if (!user || !user.UserProfile) {
      console.error("User or UserProfile not found.");
      return {
        success: false,
        message: "Please update your User Profile first!",
      };
    }

    // Destructure userProfile and user to get the necessary fields
    const { height, weight, activity_type, goal } = user.UserProfile;
    const { dob } = user; // Get the dob (date of birth) from the User schema
    const gender = user.gender;

    // Calculate the user's age based on the date of birth
    const currentDate = new Date();
    const birthDate = new Date(dob);
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const month = currentDate.getMonth();
    if (
      month < birthDate.getMonth() ||
      (month === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    // Validate the input
    if (!height || !weight || !activity_type || !goal || !gender) {
      console.error("All fields are required.");
      return {
        success: false,
        message:
          "All fields (Height, Weight, Activity Type, Goal, Gender) are required.",
      };
    }

    // Calculate BMR using Mifflin-St Jeor Equation
    function calculateBMR(weight, height, age, gender) {
      if (gender === "male") {
        return 10 * weight + 6.25 * height - 5 * age + 5;
      } else {
        return 10 * weight + 6.25 * height - 5 * age - 161;
      }
    }

    // Activity multipliers based on activity type
    const activityMultipliers = {
      LAZY: 1.2, // Sedentary
      MODERATE: 1.375, // Lightly active
      ACTIVE: 1.55, // Moderately active
      SPORTS_PERSON: 1.725, // Very active
    };

    // Get the activity multiplier based on activity type
    const activityMultiplier = activityMultipliers[activity_type];
    if (!activityMultiplier) {
      throw new Error("Invalid activity type.");
    }

    // Determine the BMR based on the gender
    const BMR = calculateBMR(weight, height, age, gender);

    // Calculate TDEE (Total Daily Energy Expenditure)
    const TDEE = BMR * activityMultiplier;

    // Calculate calories for the goal (weight loss, maintenance, or weight gain)
    let caloriesForGoal = {
      maintain: TDEE,
      lose: TDEE - 500, // 500-calorie deficit for weight loss
      gain: TDEE + 500, // 500-calorie surplus for weight gain
    };

    // Adjust based on the user goal input
    let dailyCalories;
    let caloriesToBurn;

    if (goal.toLowerCase() === "maintain") {
      dailyCalories = TDEE;
      caloriesToBurn = 0; // For maintenance, we don't need to burn extra
    } else if (goal.toLowerCase() === "lose") {
      dailyCalories = TDEE - 500;
      caloriesToBurn = 500; // Suggested 500-calorie deficit to burn for weight loss
    } else if (goal.toLowerCase() === "gain") {
      dailyCalories = TDEE + 500;
      caloriesToBurn = 0; // For weight gain, burning extra calories isn't prioritized
    } else {
      throw new Error("Invalid goal. Use 'gain', 'lose', or 'maintain'.");
    }

    // Return the calculated values as an object
    return {
      success: true,
      BMR,
      TDEE,
      goal,
      caloriesForGoal: {
        maintain: caloriesForGoal.maintain,
        lose: caloriesForGoal.lose,
        gain: caloriesForGoal.gain,
      },
      caloriesToBurn,
      dailyCalories,
    };
  } catch (error) {
    console.error("Error calculating calories:", error.message);
    throw new Error("Internal server error");
  }
};

export const getDietPlanItems = async (userId, planId) => {
  try {
    const planItems = await prisma.dietPlanItem.findMany({
      where: {
        user_id: userId,
        diet_plan_id: planId.planId,
      },
    });
    return planItems;
  } catch (error) {
    console.error("Error getting diet plan items:", error.message);
    throw new Error("Internal server error");
  }
};

export const createMultipleDietPlanItems = async (req, res) => {
  const { body } = req;

  try {
    // Validate request body using Zod
    const parsedBody = createDietPlanItemSchema.parse(body);

    // Log parsed body to debug

    // Prepare data for the diet plan items
    const dietPlanItems = [
      {
        diet_plan_id: parsedBody.diet_plan_id,
        meal_type: "BREAKFAST",
        food_id: 1,
        quantity: 100,
        user_id: parsedBody.user_id, // Ensure user_id is passed correctly
        plan_type: "AI",
        date: new Date().toISOString(),
        created_by_id: parsedBody.created_by_id, // Ensure created_by_id is passed correctly
        status: "PENDING",
      },
      {
        diet_plan_id: parsedBody.diet_plan_id,
        meal_type: "LUNCH",
        food_id: 2,
        quantity: 1,
        user_id: parsedBody.user_id,
        plan_type: "AI",
        date: new Date().toISOString(),
        created_by_id: parsedBody.created_by_id,
        status: "PENDING",
      },
      {
        diet_plan_id: parsedBody.diet_plan_id,
        meal_type: "DINNER",
        food_id: 3,
        quantity: 200,
        user_id: parsedBody.user_id,
        plan_type: "AI",
        date: new Date().toISOString(),
        created_by_id: parsedBody.created_by_id,
        status: "PENDING",
      },
      {
        diet_plan_id: parsedBody.diet_plan_id,
        meal_type: "SNACK",
        food_id: 4,
        quantity: 150,
        user_id: parsedBody.user_id,
        plan_type: "AI",
        date: new Date().toISOString(),
        created_by_id: parsedBody.created_by_id,
        status: "PENDING",
      },
    ];

    // Create multiple DietPlanItems in a single query
    const dietPlanItemsCreated = await prisma.dietPlanItem.createMany({
      data: dietPlanItems,
    });

    return res.status(201).json({
      success: true,
      message: "Diet Plan Items created successfully",
      dietPlanItems: dietPlanItemsCreated,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const createMultipleDietPlanItemsHelper = async (
  parsedBody,
  diet_planId,
  userId
) => {
  const dateToBeUpdated = await prisma.dietPlan.findFirst({
    where: {
      id: diet_planId,
    },
    select: {
      date: true,
    },
  });

  try {
    // Fetch the existing diet plan items from the database for comparison
    const existingDietPlans = await prisma.dietPlanItem.findMany({
      where: {
        diet_plan_id: diet_planId, // Assuming you pass diet_plan_id to filter existing plans
        user_id: parsedBody.user_id, // Filter based on user if necessary
      },
    });

    // Extract existing meal types from the database
    const existingMealTypes = existingDietPlans.map((item) => item.meal_type);

    // Prepare data for missing meal types only
    const dietPlanItems = [];

    // Iterate through the parsedBody diet_plan object and check if each meal_type already exists
    for (let item of Object.values(parsedBody.diet_plan)) {
      // Check if the meal_type is already present in the existing database
      if (!existingMealTypes.includes(item.meal_type)) {
        // If not, create the new item to insert into the database
        const newItem = {
          diet_plan_id: diet_planId,
          meal_type: item.meal_type,
          food_id: item.food_id,
          quantity: item.quantity,
          user_id: item.user_id,
          plan_type: item.plan_type || "AI", // Default "AI" if missing
          date: dateToBeUpdated.date,
          created_by_id: item.created_by_id,
          status: item.status || "PENDING", // Default "PENDING" if missing
        };

        // Add missing item to the dietPlanItems array
        dietPlanItems.push(newItem);
      }
    }

    // If there are missing diet plan items, insert them into the database
    if (dietPlanItems.length > 0) {
      const dietPlanItemsCreated = await prisma.dietPlanItem.createMany({
        data: dietPlanItems,
      });
      await prisma.notification.create({
        data: {
          user_id: userId,
          message: "Diet Plan Items created successfully",
        },
      });

      // Return success message with created diet plan items
      return {
        success: true,
        message: "Missing Diet Plan Items created successfully",
        dietPlanItems: dietPlanItemsCreated,
      };
    } else {
      // If there are no missing items, return a message indicating that
      return {
        success: true,
        message: "All diet plan items already exist in the database",
      };
    }
  } catch (error) {
    console.error("Error creating diet plan items:", error);
    throw new Error(error.message);
  }
};
export const getOrCreateDailyProgress = async (userId) => {
  try {
    // Get the current date and time in UTC
    const now = new Date();

    // Calculate the offset for Arlington time (UTC-5 or UTC-4 depending on DST)
    // Arlington follows US Eastern Time
    const date = new Date();
    const isEDT = /\(EDT\)/.test(date.toString()); // Check if EDT (Daylight Saving Time)
    const arlingtonOffset = isEDT ? -4 * 60 * 60 * 1000 : -5 * 60 * 60 * 1000; // -4 or -5 hours in milliseconds

    // Construct the current day in Arlington time (midnight Arlington time)
    const arlingtonToday = new Date(now.getTime() + arlingtonOffset);
    arlingtonToday.setUTCHours(0, 0, 0, 0); // Set to midnight Arlington time

    // Calculate the end of the day in Arlington time (23:59:59.999)
    const endOfDay = new Date(arlingtonToday);
    endOfDay.setUTCHours(23, 59, 59, 999); // Set to 23:59:59.999 Arlington time

    // Convert both dates to ISO string format to ensure Arlington time handling
    const todayISOString = arlingtonToday.toISOString();
    const endOfDayISOString = endOfDay.toISOString();

    // Check if there's an existing daily progress record for today
    const existingProgress = await prisma.dailyProgress.findFirst({
      where: {
        user_id: userId,
        date: {
          gte: arlingtonToday, // Start of today in Arlington time
          lt: endOfDay, // End of today in Arlington time
        },
      },
    });

    // If the daily progress already exists, return it
    if (existingProgress) {
      return { dailyProgressId: existingProgress.id };
    }

    // If no progress exists, create a new daily progress record for today
    const newDailyProgress = await prisma.dailyProgress.create({
      data: {
        user_id: userId,
        date: todayISOString, // Set date to the start of the day in Arlington time
        calories_intake: 0,
        calories_burned: 0,
        protein_intake: 0,
        carbs_intake: 0,
        fats_intake: 0,
        steps_count: 0,
        water_intake: 0,
        goal_status: "ON_TRACK", // Set the initial status to ON_TRACK
      },
    });

    // Return the new daily progress ID
    return { dailyProgressId: newDailyProgress.id };
  } catch (error) {
    console.error("Error fetching or creating daily progress:", error);
    throw new Error("Something went wrong while handling the daily progress.");
  }
};
