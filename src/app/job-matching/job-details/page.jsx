import { redirect } from 'next/navigation'

export default function JobDetailsIndexPage() {
  // Redirect to the main job matching page if someone visits /job-details directly
  redirect('/job-matching')
}

