import { Request, Response } from "express";
import { DeleteItemOrderService } from "../../services/order/DeleteItemOrderService";

class DeleteItemOrderController {
  async handle(req: Request, res: Response) {
    const item_id =
      (req.query && (req.query as any).item_id) ||
      (req.body && (req.body as any).item_id);

    if (!item_id) {
      return res.status(400).json({ error: "item_id is required" });
    }

    const deleteItemOrderService = new DeleteItemOrderService();

    try {
      const item = await deleteItemOrderService.execute({
        item_id: String(item_id),
      });

      return res.status(200).json(item);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return res.status(500).json({ error: message });
    }
  }
}

export { DeleteItemOrderController };
