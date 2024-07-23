<script lang="ts" setup>
interface Post {
  id: string
  slug: string
  title: string
  html: string
  excerpt: string
  feature_image: string
  published_at: string
  reading_time: number
  tags: Array<{ name: string, slug: string }>
  primary_author: { name: string, profile_image: string }
}

withDefaults(defineProps<{
  list: Post[]
}>(), {
  list: () => [],
})

function getDate(date: string) {
  return new Date(date).toISOString()
}

function getHref(post: Post) {
  return `/posts/${post.slug}/`
}

function isSameYear(a: Date | string | number, b: Date | string | number) {
  return a && b && getYear(a) === getYear(b)
}

function getYear(date: Date | string | number) {
  return new Date(date).getFullYear()
}
</script>

<template>
  <ul sm:min-h-38 min-h-28 mb-18>
    <template v-if="!list || list.length === 0">
      <div my-12 opacity-50>
        nothing here yet.
      </div>
    </template>
    <li v-for="(post, index) in list " :key="post.id" mb-8>
      <div v-if="!isSameYear(post.published_at, list[index - 1]?.published_at)" select-none relative h18 pointer-events-none>
        <span text-7em color-transparent font-bold text-stroke-2 text-stroke-hex-aaa op14 absolute top--0.2em>
          {{ getYear(post.published_at) }}
        </span>
      </div>
      <a text-lg lh-tight nav-link flex="~ col gap-2" :aria-label="post.title" :href="getHref(post)">
        <div flex="~ col md:row gap-2 md:items-center">
          <div flex="~ gap-2 items-center text-wrap">
            <span lh-normal>
              {{ post.title }}
            </span>
          </div>
          <div opacity-50 text-sm ws-nowrap flex="~ gap-2 items-center">
            <time v-if="post.published_at" :datetime="getDate(post.published_at)">{{ new Date(post.published_at).toLocaleDateString() }}</time>
            <span v-if="post.reading_time">· {{ post.reading_time }} min read</span>
            <span v-if="post.tags && post.tags.length">· {{ post.tags[0].name }}</span>
          </div>
        </div>
      </a>
    </li>
  </ul>
</template>
