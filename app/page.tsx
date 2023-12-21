import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import EmptyState from "@/app/components/EmptyState";



import getListings, { 
  IListingsParams
} from "@/app/actions/getListings";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import ListingMap from "./components/ListingMap";


interface HomeProps {
  searchParams: IListingsParams
};

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
        <Container>
          <main className="flex">
            <section className="flex-col flex-grow">
              <div 
                className="
                  pt-24
                  gap-8
                "
              >
                {listings.map((listing: any) => (
                  <ListingCard
                    currentUser={currentUser}
                    key={listing.id}
                    data={listing}
                  />
                ))}
              </div>
            </section>
            <section className="hidden xl:inline-flex xl:min-w-[600px]">
              <ListingMap listings={listings}/>
            </section>
          </main>
        </Container>
    </ClientOnly>
  )
}

export default Home;
