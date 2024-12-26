import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IOrder } from "@/types/order";
import {
  Box,
  Collapse,
  colors,
  Table,
  TableBody,
  TableHead,
  Typography,
} from "@mui/material";
import useBoolean from "@/hooks/use-boolean";
import { ArrowDropDown, Edit } from "@mui/icons-material";
import VendorOrderStatusUpdateDialog from "./vendor-order-status-update-dialog";

type Props = {
  row: IOrder;
};

export default function VendorOrderTableRow({ row }: Props) {
  const {
    _id,
    createdAt,
    phone,
    items,
    totalPrice,
    status,
    deliveryCharge,
    address,
  } = row;

  const boolean = useBoolean();
  const dialog = useBoolean();

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={boolean.toggle}
          >
            {boolean.value ? <KeyboardArrowUpIcon /> : <ArrowDropDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {_id}
        </TableCell>
        <TableCell>{phone}</TableCell>
        <TableCell>{address ?? "N/A"}</TableCell>
        <TableCell>{new Date(createdAt).toLocaleString()}</TableCell>

        <TableCell align="left">৳{totalPrice}</TableCell>
        <TableCell align="left">{status}</TableCell>

        <TableCell padding="checkbox">
          <IconButton
            size="small"
            onClick={dialog.setTrue}
            sx={{
              bgcolor: colors.grey[300],
            }}
          >
            <Edit />
          </IconButton>
        </TableCell>
      </TableRow>

      {/* Collapsible Row for Products */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={boolean.value} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Products
              </Typography>
              <Table size="small" aria-label="products">
                <TableHead>
                  <TableRow>
                    <TableCell>Product ID</TableCell>
                    <TableCell>Banner</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((product) => (
                    <TableRow key={product.product._id}>
                      <TableCell>{product.product._id.slice(0, 15)}</TableCell>
                      <TableCell>
                        {/* <img
                          src={product.product.images[0].image}
                          className="h-11 w-10  object-contain"
                          alt=""
                        /> */}
                      </TableCell>
                      <TableCell>{product.product.name}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>৳{product.price}</TableCell>
                    </TableRow>
                  ))}
                  {/* Product Total Price Row */}
                  <TableRow>
                    <TableCell colSpan={4} />
                    <TableCell
                      sx={{
                        borderTop: "1px solid rgba(224, 224, 224, 1)", // Adds top border
                        fontWeight: "bold", // Makes total price bold
                      }}
                    >
                      Product Total: ৳
                      {items.reduce(
                        (total, product) =>
                          total + product.price * product.quantity,
                        0
                      )}
                    </TableCell>
                  </TableRow>

                  {/* Delivery Charge Row */}
                  <TableRow>
                    <TableCell colSpan={4} />
                    <TableCell>Delivery Charge: ৳{deliveryCharge}</TableCell>
                  </TableRow>

                  {/* Final Total Price (Product Total + Delivery Charge) */}
                  <TableRow>
                    <TableCell colSpan={4} />
                    <TableCell
                      sx={{
                        borderTop: "1px solid rgba(224, 224, 224, 1)", // Adds top border
                        fontWeight: "bold", // Makes total price bold
                      }}
                    >
                      Total Price: ৳
                      {items.reduce(
                        (total, product) =>
                          total + product.price * product.quantity,
                        0
                      ) + deliveryCharge}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      <VendorOrderStatusUpdateDialog
        open={dialog.value}
        onClose={dialog.setFalse}
        status={row.status}
        orderId={_id as string}
      />
    </>
  );
}
