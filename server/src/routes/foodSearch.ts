import express, {
  type Request as ExpressRequest,
  type Response as ExpressResponse,
} from "express";

const router = express.Router();

const FDC_BASE_URL = "https://api.nal.usda.gov/fdc/v1";

function getApiKey(): string {
  return process.env.USDA_FDC_API_KEY || "DEMO_KEY";
}

type FdcNutrient = {
  nutrientName?: string;
  value?: number;
};

type FdcFood = {
  fdcId: number;
  description?: string;
  dataType?: string;
  brandOwner?: string;
  foodNutrients?: FdcNutrient[];
};

type FdcSearchResponse = {
  totalHits?: number;
  foods?: FdcFood[];
};

// GET /api/food-search?query=chicken%20breast&pageSize=10
router.get("/food-search", async (req: ExpressRequest, res: ExpressResponse) => {
  try {
    const { query, pageSize } = req.query;

    if (!query || typeof query !== "string") {
      return res
        .status(400)
        .json({ error: "Query parameter 'query' is required" });
    }

    const params = new URLSearchParams({
      api_key: getApiKey(),
      query,
      pageSize: typeof pageSize === "string" ? pageSize : "10",
    });

    const fdcRes = await fetch(
      `${FDC_BASE_URL}/foods/search?${params.toString()}`
    );

    if (!fdcRes.ok) {
      return res.status(fdcRes.status).json({
        error: "USDA FoodData Central request failed",
        status: fdcRes.status,
      });
    }

    const data = (await fdcRes.json()) as FdcSearchResponse;

    const foods = (data.foods ?? []).map((food) => ({
      fdcId: food.fdcId,
      description: food.description,
      dataType: food.dataType,
      brandOwner: food.brandOwner ?? null,

      calories:
        food.foodNutrients?.find(
          (n) => n.nutrientName === "Energy"
        )?.value ?? null,

      protein:
        food.foodNutrients?.find(
          (n) => n.nutrientName === "Protein"
        )?.value ?? null,

      carbs:
        food.foodNutrients?.find(
          (n) => n.nutrientName === "Carbohydrate, by difference"
        )?.value ?? null,

      fat:
        food.foodNutrients?.find(
          (n) => n.nutrientName === "Total lipid (fat)"
        )?.value ?? null,
    }));

    return res.json({
      totalHits: data.totalHits ?? 0,
      foods,
    });
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ error: "Failed to search USDA FoodData Central" });
  }
});

// GET /api/food-details/:fdcId
router.get("/food-details/:fdcId", async (req: ExpressRequest, res: ExpressResponse) => {
  try {
    const { fdcId } = req.params;

    const params = new URLSearchParams({
      api_key: getApiKey(),
    });

    const fdcRes = await fetch(
      `${FDC_BASE_URL}/food/${fdcId}?${params.toString()}`
    );

    if (!fdcRes.ok) {
      return res.status(fdcRes.status).json({
        error: "USDA FoodData Central request failed",
        status: fdcRes.status,
      });
    }

    const data = await fdcRes.json();

    return res.json(data);
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ error: "Failed to fetch food details from USDA FoodData Central" });
  }
});

export default router;
