import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { toast } from "sonner";

import { Order } from "@/models/responses";

export const useOrderPDF = () => {
  const parsePrice = (priceStr: string): number => {
    return parseFloat(priceStr.replace(/[$.]/g, ""));
  };

  const formatCurrency = (amount: number): string => {
    return `$${amount.toLocaleString("es-CL")}`;
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-CL", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const generateOrderPDF = async (orderData: Order) => {
    try {
      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([595, 842]); // A4 size
      const { width, height } = page.getSize();

      // Load fonts
      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

      // Colors
      const primaryColor = rgb(0.2, 0.4, 0.8);
      const textColor = rgb(0.2, 0.2, 0.2);
      const lightGray = rgb(0.9, 0.9, 0.9);

      let yPosition = height - 60;

      // Header - Title
      page.drawText("ORDEN DE COMPRA", {
        x: 50,
        y: yPosition,
        size: 24,
        font: fontBold,
        color: primaryColor,
      });

      yPosition -= 40;

      // Order code and date
      page.drawText(`Orden: ${orderData.code}`, {
        x: 50,
        y: yPosition,
        size: 14,
        font: fontBold,
        color: textColor,
      });

      page.drawText(`Fecha: ${formatDate(orderData.purchasedAt)}`, {
        x: 50,
        y: yPosition - 20,
        size: 10,
        font: fontRegular,
        color: textColor,
      });

      yPosition -= 60;

      // Line separator
      page.drawLine({
        start: { x: 50, y: yPosition },
        end: { x: width - 50, y: yPosition },
        thickness: 2,
        color: primaryColor,
      });

      yPosition -= 30;

      // Products Section
      page.drawText("PRODUCTOS", {
        x: 50,
        y: yPosition,
        size: 14,
        font: fontBold,
        color: textColor,
      });

      yPosition -= 25;

      // Table headers
      const headerY = yPosition;
      page.drawRectangle({
        x: 50,
        y: headerY - 5,
        width: width - 100,
        height: 25,
        color: lightGray,
      });

      page.drawText("Producto", {
        x: 60,
        y: headerY + 5,
        size: 10,
        font: fontBold,
        color: textColor,
      });

      page.drawText("Cant.", {
        x: 320,
        y: headerY + 5,
        size: 10,
        font: fontBold,
        color: textColor,
      });

      page.drawText("Precio Unit.", {
        x: 380,
        y: headerY + 5,
        size: 10,
        font: fontBold,
        color: textColor,
      });

      page.drawText("Subtotal", {
        x: 470,
        y: headerY + 5,
        size: 10,
        font: fontBold,
        color: textColor,
      });

      yPosition -= 30;

      // Table rows
      for (const item of orderData.items) {
        // Verify page space
        if (yPosition < 150) {
          // Create a new page if not enough space
          const newPage = pdfDoc.addPage([595, 842]);
          yPosition = height - 60;

          // Re-draw headers on new page
          newPage.drawRectangle({
            x: 50,
            y: yPosition - 5,
            width: width - 100,
            height: 25,
            color: lightGray,
          });

          newPage.drawText("Producto", {
            x: 60,
            y: yPosition + 5,
            size: 10,
            font: fontBold,
            color: textColor,
          });

          newPage.drawText("Cant.", {
            x: 320,
            y: yPosition + 5,
            size: 10,
            font: fontBold,
            color: textColor,
          });

          newPage.drawText("Precio Unit.", {
            x: 380,
            y: yPosition + 5,
            size: 10,
            font: fontBold,
            color: textColor,
          });

          newPage.drawText("Subtotal", {
            x: 470,
            y: yPosition + 5,
            size: 10,
            font: fontBold,
            color: textColor,
          });

          yPosition -= 30;
        }

        const priceNum = parsePrice(item.priceAtMoment);
        const subtotal = priceNum * item.quantity;

        // Product (with truncation if too long)
        const productTitle =
          item.productTitle.length > 40
            ? item.productTitle.substring(0, 37) + "..."
            : item.productTitle;

        page.drawText(productTitle, {
          x: 60,
          y: yPosition,
          size: 9,
          font: fontRegular,
          color: textColor,
        });

        // Quantity
        page.drawText(item.quantity.toString(), {
          x: 335,
          y: yPosition,
          size: 9,
          font: fontRegular,
          color: textColor,
        });

        // Unit price
        page.drawText(item.priceAtMoment, {
          x: 390,
          y: yPosition,
          size: 9,
          font: fontRegular,
          color: textColor,
        });

        // Subtotal
        page.drawText(formatCurrency(subtotal), {
          x: 470,
          y: yPosition,
          size: 9,
          font: fontRegular,
          color: textColor,
        });

        yPosition -= 25;
      }

      yPosition -= 20;

      // Line separator before total
      page.drawLine({
        start: { x: 50, y: yPosition },
        end: { x: width - 50, y: yPosition },
        thickness: 1,
        color: lightGray,
      });

      yPosition -= 30;

      // Total
      page.drawRectangle({
        x: 350,
        y: yPosition - 10,
        width: 195,
        height: 40,
        color: rgb(0.95, 0.97, 1),
        borderColor: primaryColor,
        borderWidth: 2,
      });

      page.drawText("TOTAL:", {
        x: 370,
        y: yPosition + 8,
        size: 14,
        font: fontBold,
        color: textColor,
      });

      page.drawText(orderData.total, {
        x: 450,
        y: yPosition + 8,
        size: 16,
        font: fontBold,
        color: primaryColor,
      });

      // Footer
      const footerY = 50;
      page.drawText("Gracias por tu compra", {
        x: width / 2 - 60,
        y: footerY,
        size: 10,
        font: fontRegular,
        color: textColor,
      });

      page.drawText(
        "Este documento es una representación digital de tu orden",
        {
          x: width / 2 - 130,
          y: footerY - 15,
          size: 8,
          font: fontRegular,
          color: rgb(0.6, 0.6, 0.6),
        }
      );

      // Generate PDF bytes and trigger download
      const pdfBytes = await pdfDoc.save();
      const uint8Array = new Uint8Array(pdfBytes);
      const blob = new Blob([uint8Array as BlobPart], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `orden-${orderData.code}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("PDF descargado exitosamente");
    } catch (error) {
      toast.dismiss();
      console.error("Error generando PDF:", error);
      toast.error("Error al generar el PDF");
    }
  };

  return {
    generateOrderPDF,
  };
};
