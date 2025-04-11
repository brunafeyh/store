import { FC, useState } from "react";
import PageClientLayout from "../../../layout/client";
import { useBrands } from "../../../hooks/brands/use-brands";
import Loading from "../../../components/loading";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { THEME_COLORS } from "../../../theme/colors";
import ClothingItem from "../../../components/clothing-item";
import { Search } from "@carbon/icons-react";

export const BrandsItemsPage: FC = () => {
    const [name, setName] = useState('')
    const { data, isLoading } = useBrands({name})
    if (isLoading) return <Loading />
    return (
        <PageClientLayout title="Marcas">
            <Box marginRight={4} marginLeft={4}>
                <TextField
                    variant="filled"
                    type="text"
                    sx={{ width: 250 }}
                    label="Buscar"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                        disableUnderline: true,
                    }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {data?.map((brand) => (
                    <Box display={'flex'} flexDirection={'column'} gap={2} mt={2}>
                        <Typography color={THEME_COLORS.neutral.c80} fontSize={20}>{brand.name}</Typography>
                        <Box display={'flex'} flexDirection={'row'} gap={4}>
                            {brand.items.map((item) => (
                                <ClothingItem key={item.id} item={item || []} />
                            ))}
                        </Box>
                    </Box>
                ))}
            </Box>
        </PageClientLayout>
    )
}