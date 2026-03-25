import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage, Head } from "@inertiajs/react";
import StoryCard from "@/Components/StoryCard";

export default function StoryPreview() {
    const { story, auth } = usePage().props;
   

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title={story.title} />
          
            <div className="layout">
                <table>
                    <tbody>
                        <StoryCard
                            story={story}
                            showActions={false}
                            fullText={true}
                        />
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
