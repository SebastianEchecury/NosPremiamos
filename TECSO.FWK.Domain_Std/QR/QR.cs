using QRCoder;
using System;
using System.IO;
using TECSO.FWK.AppService.Interface;
using TECSO.FWK.Domain;
using Microsoft.Extensions.DependencyInjection;
using System.Threading.Tasks;
using System.Drawing.Imaging;

namespace TECSO.FWK.Domain_Std.QR
{
    public static class QR
    {
        public static async Task<Byte[]> Generate(string qrContent)
        {
            ILogger logger = (ILogger)ServiceProviderResolver.ServiceProvider.GetService<ILogger>();
            try
            {
                logger.LogInformation(string.Format("Generar QR | Content: {0}", qrContent));

                QRCodeGenerator qrGenerator = new QRCodeGenerator();
                QRCodeData qrCodeData = qrGenerator.CreateQrCode(qrContent, QRCodeGenerator.ECCLevel.Q);
                QRCode qrCode = new QRCode(qrCodeData);
                Byte[] image;
                using (System.Drawing.Bitmap  qrCodeImage = qrCode.GetGraphic(20))
                {
                    //qrCodeImage.Save(string.Format(@"d:\{0}.png", qrContent), ImageFormat.Png);
                    using (var memoryStream = new MemoryStream())
                    {
                        qrCodeImage.Save(memoryStream, System.Drawing.Imaging.ImageFormat.Png);
                        image = memoryStream.ToArray();
                    }
                }
                return image;
            }
            catch (Exception ex)
            {
                logger.LogError(string.Format("Generar QR | Content: {0} - error {1}", qrContent, ex.Message));
            }
            return null;
        }
    }
}
