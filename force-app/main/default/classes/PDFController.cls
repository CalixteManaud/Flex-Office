public with sharing class PDFController {
    @AuraEnabled
    public static Blob generatePDF(List<Reservation__c> reservations) {
        try {
            String pdfContent = generatePDFContent(reservations);
            return Blob.valueOf(pdfContent);
        } catch (Exception e) {
            throw new AuraHandledException('Erreur lors de la génération du PDF : ' + e.getMessage());
        }
    }

    private static String generatePDFContent(List<Reservation__c> reservations) {
        String pdfContent = '';
        for (Reservation__c reservation : reservations) {
            pdfContent += reservation.Name + '\n';
        }
        return pdfContent;
    }
}