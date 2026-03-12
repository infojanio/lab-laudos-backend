import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { search } from "./search";
import { nearby } from "./nearby";
import { create } from "./create";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";
import { listStores } from "./listStores";
import { listStoresActive } from "./listStoresActive";
import { toggleStatus } from "./toggleStore";
import { listStoresByCityAndCategory } from "./list-stores-by-city-and-category";
import { listStoreByBusinessCategoriesController } from "../store-business-category/list-store-by-business-categories";
import { listStoresByCity } from "./list-stores-by-city";
import { FetchStoreById } from "./fetch-store-by-id";
import { getStoreCategoriesController } from "./get-store-categories";

export async function storesRoutes(app: FastifyInstance) {
  // 🔓 Permite acesso público às rotas de busca e lojas próximas
  app.get("/stores/search", search);
  app.get("/stores/nearby", nearby);
  app.get("/stores", listStores);

  // Listar todas as lojas por business
  app.get(
    "/stores/business/:categoryId",
    listStoreByBusinessCategoriesController,
  );

  app.get(
    "/stores/city/:cityId/category/:categoryId",
    listStoresByCityAndCategory,
  );

  app.get("/stores/city/:cityId", listStoresByCity);

  app.get("/stores/:storeId", FetchStoreById);

  app.get("/stores/:storeId/categories", getStoreCategoriesController);

  app.get("/stores/active", listStoresActive);
  //app.post('/stores', create)

  // 🔐 As demais rotas exigem autenticação
  app.addHook("onRequest", verifyJWT);
  app.post("/stores", { onRequest: [verifyUserRole("SUPER_ADMIN")] }, create);
  app.patch(
    "/stores/:storeId/toggle-status",
    { onRequest: [verifyUserRole("SUPER_ADMIN")] },
    toggleStatus,
  );
}
