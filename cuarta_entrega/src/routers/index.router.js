import {Router} from "express";
const router = Router();

router.get('/', (req, res) => {
  res.render("index",{tittle:"BIENVENIDO AL CHAT 🚀"});
});

export default router;
