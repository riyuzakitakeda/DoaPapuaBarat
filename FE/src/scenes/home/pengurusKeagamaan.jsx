import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material"
import tetang_bg from '../../assets/image/tetangkami_bg.jpeg'
import tetang_1 from '../../assets/image/tentang_1.jpeg'
import tetang_2 from '../../assets/image/tentang_2.png'
import tetang_3 from '../../assets/image/tentang_3.jpeg'


const pengurus = [
    {
        nama: 'Nama Ketua',
        jabatan: 'jabatan 1',
        alt: 'Galeri 1',
        sources: tetang_1
    },
    {
        nama: 'Nama Ketua',
        jabatan: 'jabatan 2',
        alt: 'Galeri 2',
        sources: tetang_2
    },
    {
        nama: 'Nama Ketua',
        jabatan: 'jabatan 3',
        alt: 'Galeri 3',
        sources: tetang_3
    },
    
]

const PengurusKeagamaan = () => {
    return (
        <Grid container direction={'column'}>
            <Grid item container
                alignItems={'center'}
                justifyContent={'center'}
                paddingY={5}
                sx={{
                    background: `linear-gradient(90deg, rgba(59, 128, 69, 0.6864) 50%, rgba(0, 0, 0, 0.88)), url(${tetang_bg});`,
                    backgroundPosition: '50% 30%',
                    backgroundSize: 'cover',
                    height: '250px'
                }}
            >
                <Grid item sm={12} container justifyContent={'center'}>
                    <Typography variant="h2" fontWeight={700} color={'#FFFFFF'}>
                        {'Pengurus Keagamaan'}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container item direction={'row'} marginTop={3} marginBottom={5} paddingX={5} justifyContent={'center'}>
                {
                    pengurus.map((item) => (
                        <Grid container item sm={3} padding={1} justifyContent={'center'}>
                            <Card>
                                <CardMedia
                                    component={'img'}
                                    sx={{
                                        width: 230,
                                        height: 200,
                                        objectFit: 'cover',
                                        objectPosition: '50% 0'
                                    }}
                                    image={item.sources}
                                    title={item.alt}
                                />
                                <CardContent>
                                    <Typography fontWeight={700}>
                                        {item.nama}
                                    </Typography>
                                    <Typography color={'#3B8045'}>
                                        {item.jabatan}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
        </Grid>
    )
}

export default PengurusKeagamaan;