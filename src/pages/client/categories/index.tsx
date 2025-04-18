import { FC, useState } from "react"
import PageClientLayout from "../../../layout/client"
import { useCategories } from "../../../hooks/categories/use-categories"
import Loading from "../../../components/loading"
import ClothingItem from "../../../components/clothing-item"
import { Box, InputAdornment, TextField, Typography } from "@mui/material"
import { THEME_COLORS } from "../../../theme/colors"
import { Search } from "@carbon/icons-react"

const TITLE = "Categorias"

export const CategoriesItems: FC = () => {
    const [name, setName] = useState('')
    const { data, isLoading } = useCategories({name})
    if (isLoading) return <Loading />
    return (
        <PageClientLayout title={TITLE}>
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
                {data?.map((category) => (
                    <Box display={'flex'} flexDirection={'column'} gap={2} mt={2}>
                        <Typography color={THEME_COLORS.neutral.c80} fontSize={20}>{category.name}</Typography>
                        <Box display={'flex'} flexDirection={'row'} gap={4}>
                            {category.items.map((item) => (
                                <ClothingItem key={item.id} item={item || []} />
                            ))}
                        </Box>
                    </Box>
                ))}
            </Box>
        </PageClientLayout>
    )
}