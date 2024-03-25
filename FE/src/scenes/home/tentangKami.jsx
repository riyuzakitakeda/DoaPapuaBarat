import { Grid, Typography } from "@mui/material"
import tetang_bg from '../../assets/image/tetangkami_bg.jpeg'
import tetang_1 from '../../assets/image/tentang_1.jpeg'
import tetang_2 from '../../assets/image/tentang_2.png'
import tetang_3 from '../../assets/image/tentang_3.jpeg'


const columnGaleri = [
    {
        alt: 'Galeri 1',
        sources: tetang_1
    },
    {
        alt: 'Galeri 2',
        sources: tetang_2
    },
    {
        alt: 'Galeri 3',
        sources: tetang_3
    },
]

const TentangKami = () => {
    return (
        <Grid container direction={'column'}>
            <Grid item container
                alignItems={'center'}
                justifyContent={'center'}
                paddingY={5}
                sx={{
                    background: `linear-gradient(90deg, rgba(59, 128, 69, 0.6864) 50%, rgba(0, 0, 0, 0.88)), url(${tetang_bg});`,
                    backgroundPosition: '50% 30%',
                    backgroundSize: 'cover'
                }}
            >
                <Grid item sm={12} container justifyContent={'center'}>
                    <Typography variant="h2" fontWeight={700} color={'#FFFFFF'}>
                        {'Tentang Kami'}
                    </Typography>
                </Grid>
                <Grid item container xs={11} sm={8} paddingTop={3}>
                    <Typography color={'#FFFFFF'} variant="body1">
                        {'Biro Kesejahteraan Rakyat (Kesra) Pemerintah Provinsi Papua Barat memiliki tugas pokok untuk membantu Gubernur dalam melaksanakan urusan pemerintahan di bidang kesejahteraan rakyat, yang meliputi pemberdayaan masyarakat, sosial, keagamaan, & organisasi kemasyarakatan.'}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container item direction={'row'} marginY={8} paddingX={5}>
                {
                    columnGaleri.map((item) => (
                        <Grid item sm={4} padding={1}>
                            <img width={'100%'} height={'250'} src={item.sources} alt={item.alt} />
                        </Grid>
                    ))
                }
            </Grid>
        </Grid>
    )
}

export default TentangKami;