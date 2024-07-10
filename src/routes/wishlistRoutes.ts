import { Router } from "express";
import {
  checkIfWishlisted,
  getWishlist,
  removeFromWishlist,
  toggleWishlist,
} from "../controllers/wishlistController";

const router = Router();

router.post("/removeFromWishlist", removeFromWishlist);
router.post("/toggle", toggleWishlist);
router.get("/:userId", getWishlist);
router.get("/check/:userId/:productId", checkIfWishlisted);

export default router;
