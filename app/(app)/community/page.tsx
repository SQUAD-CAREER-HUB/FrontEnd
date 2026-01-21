import CommunityHeader from '@/features/community/components/CommunityHeader';
import PostWriteSection from '@/features/community/components/PostWriteSection';
import SearchablePostList from '@/features/community/components/SearchablePostList';

export default function CommunityPage() {
  return (
    <div className='p-4 max-w-4xl mx-auto'>
      <CommunityHeader />
      <div className='space-y-6'>
        <PostWriteSection />
        <SearchablePostList />
      </div>
    </div>
  );
}
