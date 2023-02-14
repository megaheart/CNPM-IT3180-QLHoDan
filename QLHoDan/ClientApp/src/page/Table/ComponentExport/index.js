import { GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';

export default function CustomToolbarExport() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport
                printOptions={{ disableToolbarButton: true }}
                csvOptions={{
                    fileName: 'customerDataBase',
                    utf8WithBom: true,
                }}
            />
            {/* <GridCsvExportMenuItem options={csvOptions} />
            <GridPrintExportMenuItem options={printOptions} /> */}
        </GridToolbarContainer>
    );
}